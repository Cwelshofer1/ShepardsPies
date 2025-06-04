using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShepardsPiesAPI.Data;
using Microsoft.EntityFrameworkCore;
using ShepardsPiesAPI.Models;
using ShepardsPiesAPI.Models.DTOs;
using ShepardsPiesAPI.Modelo.DTOs;
using ShepardsPiesAPI.Models.DTO;
using System.CodeDom.Compiler;

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
        var PostPizza = new Pizza
        {
            OrderId = dto.OrderId,
            PizzaSizeId = dto.PizzaSizeId,
            PizzaCheeseId = dto.PizzaCheeseId,
            PizzaSauceId = dto.PizzaSauceId,
            TotalPizzaPrice = dto.TotalPizzaPrice
        };

        _dbContext.Pizzas.Add(PostPizza);
        await _dbContext.SaveChangesAsync();

        return Created($"/api/pizza/{PostPizza.Id}", dto);
    }

    [HttpPut("{id}")]

    public IActionResult UpdatePizza(Pizza pizza, int id)
    {
        Pizza PizzaToUpdate = _dbContext.Pizzas.SingleOrDefault(p => p.Id == id);
        if (PizzaToUpdate == null)
        {
            return NotFound();
        }
        else if (id != pizza.Id)
        {
            return BadRequest();
        }

        //These are the only properties that we want to make editable
        PizzaToUpdate.OrderId = pizza.OrderId;


        _dbContext.SaveChanges();

        return NoContent();
    }
  [HttpGet]
    public IActionResult Get()
    {
        var Pizzas = _dbContext.Pizzas;
        return Ok(Pizzas);
    }
}