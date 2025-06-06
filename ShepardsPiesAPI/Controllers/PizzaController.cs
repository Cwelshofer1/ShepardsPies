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
    public async Task<IActionResult> UpdatePizza(int id, PizzaCreateDTO dto)
    {
        var pizzaToUpdate = await _dbContext.Pizzas
            .Include(p => p.PizzaToppings)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pizzaToUpdate == null)
        {
            return NotFound();
        }

        pizzaToUpdate.OrderId = dto.OrderId;
        pizzaToUpdate.PizzaSizeId = dto.PizzaSizeId;
        pizzaToUpdate.PizzaCheeseId = dto.PizzaCheeseId;
        pizzaToUpdate.PizzaSauceId = dto.PizzaSauceId;

        // Recalculate price
        var size = await _dbContext.PizzaSizes.FindAsync(dto.PizzaSizeId);
        var toppingEntities = await _dbContext.Toppings
            .Where(t => dto.ToppingIds.Contains(t.Id))
            .ToListAsync();

        var toppingPrice = toppingEntities.Sum(t => t.ToppingPrice);
        pizzaToUpdate.TotalPizzaPrice = size.Price + toppingPrice;

        // Remove existing toppings and re-add
        _dbContext.PizzaTopping.RemoveRange(pizzaToUpdate.PizzaToppings);

        foreach (var toppingId in dto.ToppingIds)
        {
            _dbContext.PizzaTopping.Add(new PizzaTopping
            {
                PizzaId = pizzaToUpdate.Id,
                ToppingId = toppingId
            });
        }

        await _dbContext.SaveChangesAsync();

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

    [HttpDelete("{id}")]

    public IActionResult Delete(int id)
    {
        var Pizza = _dbContext.Pizzas.SingleOrDefault(p => p.Id == id);
        if (Pizza == null) return NotFound();

        _dbContext.Pizzas.Remove(Pizza);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var pizza = _dbContext.Pizzas
            .Include(p => p.PizzaSize)
            .Include(p => p.PizzaCheese)
            .Include(p => p.PizzaSauce)
            .Include(p => p.PizzaToppings)
                .ThenInclude(pt => pt.Topping)
            .SingleOrDefault(p => p.Id == id);

        if (pizza == null)
        {
            return NotFound();
        }

        var pizzaDto = new
        {
            pizza.Id,
            pizza.OrderId,
            pizza.PizzaSizeId,
            pizza.PizzaCheeseId,
            pizza.PizzaSauceId,
            ToppingIds = pizza.PizzaToppings.Select(pt => pt.ToppingId).ToList()
        };

        return Ok(pizzaDto);
    }
}
