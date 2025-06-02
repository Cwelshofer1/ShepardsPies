using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShepardsPiesAPI.Data;
using Microsoft.EntityFrameworkCore;
using ShepardsPiesAPI.Models;
using ShepardsPiesAPI.Models.DTOs;
using ShepardsPiesAPI.Modelo.DTOs;
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
    
}