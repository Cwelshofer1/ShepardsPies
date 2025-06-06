using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql.Internal;
using ShepardsPiesAPI.Data;
using ShepardsPiesAPI.Models;
using ShepardsPiesAPI.Models.DTO;

namespace ShepardsPies.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaController : ControllerBase
{
    private ShepardsPiesDbContext _dbContext;

    public PizzaController(ShepardsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    public async Task<IActionResult> Post(PizzaCreateDTO dto)
    {
        // 🍕 Get base price from PizzaSize
        var pizzaSize = await _dbContext.PizzaSizes.FindAsync(dto.PizzaSizeId);
        if (pizzaSize == null)
        {
            return BadRequest("Invalid PizzaSizeId.");
        }

        //  Get topping prices
        decimal toppingTotal = 0;
        var toppings = new List<Topping>();

        if (dto.ToppingIds != null && dto.ToppingIds.Any())
        {
            toppings = await _dbContext.Toppings
                .Where(t => dto.ToppingIds.Contains(t.Id))
                .ToListAsync();

            toppingTotal = toppings.Sum(t => t.ToppingPrice);
        }

        decimal totalPizzaPrice = pizzaSize.Price + toppingTotal;

        // Create the pizza
        var newPizza = new Pizza
        {
            OrderId = dto.OrderId,
            PizzaSizeId = dto.PizzaSizeId,
            PizzaCheeseId = dto.PizzaCheeseId,
            PizzaSauceId = dto.PizzaSauceId,
            TotalPizzaPrice = totalPizzaPrice
        };

        _dbContext.Pizzas.Add(newPizza);
        await _dbContext.SaveChangesAsync();

        //  Add PizzaTopping records
        foreach (var toppingId in dto.ToppingIds)
        {
            _dbContext.PizzaTopping.Add(new PizzaTopping
            {
                PizzaId = newPizza.Id,
                ToppingId = toppingId
            });
        }

        await _dbContext.SaveChangesAsync();

        return Created($"/api/pizza/{newPizza.Id}", new { id = newPizza.Id, totalPrice = totalPizzaPrice });
    }

    [HttpPut("{id}")]
    public IActionResult UpdatePizza(Pizza pizza, int id)
    {
        var PizzaToUpdate = _dbContext.Pizzas.SingleOrDefault(p => p.Id == id);
        if (PizzaToUpdate == null)
        {
            return NotFound();
        }
        else if (id != pizza.Id)
        {
            return BadRequest();
        }

        // You might later add more updatable fields
        PizzaToUpdate.OrderId = pizza.OrderId;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpGet]
    public IActionResult Get()
    {
        var pizzas = _dbContext.Pizzas
        .Include(o => o.Order)
        .Include(ps => ps.PizzaSize)
        .Include(pc => pc.PizzaCheese)
        .Include(psauce => psauce.PizzaSauce)
        .Include(pt => pt.PizzaToppings)
        .ThenInclude(t => t.Topping);
        return Ok(pizzas);
    }
}
