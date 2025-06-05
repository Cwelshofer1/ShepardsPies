using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShepardsPiesAPI.Data;
using Microsoft.EntityFrameworkCore;
using ShepardsPiesAPI.Models;
using ShepardsPiesAPI.Models.DTOs;
using ShepardsPiesAPI.Modelo.DTOs;

namespace ShepardsPies.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private ShepardsPiesDbContext _dbContext;

    public OrderController(ShepardsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        var orders = _dbContext.Orders
        .OrderBy(o => o.OrderDate)
        .Include(c => c.Customer);
        return Ok(orders);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] OrderResultsDTO dto)
    {
        var PostOrder = new Order
        {
            Id = dto.Id,
            TableNumber = dto.TableNumber,
            Customer = await _dbContext.Customers.FindAsync(dto.CustomerId),
            TakenByEmployee = await _dbContext.Employees.FindAsync(dto.TakenByEmployeeId),
            DeliveredByEmployee = dto.DeliveredByEmployeeId.HasValue
                ? await _dbContext.Employees.FindAsync(dto.DeliveredByEmployeeId.Value)
                : null,
            TipAmount = dto.TipAmount,
            TotalCost = dto.TotalCost,

            OrderDate = DateTime.UtcNow

        };

        _dbContext.Orders.Add(PostOrder);
        await _dbContext.SaveChangesAsync();

        return Created($"/api/order/{PostOrder.Id}", dto);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        var orders = _dbContext.Orders;

        if (orders == null)
        {
            return NotFound();
        }

        return Ok(orders);
    }

    [HttpPut("{id}")]

    public IActionResult UpdateOrder(Order order, int id)
    {
        Order OrderToUpdate = _dbContext.Orders.SingleOrDefault(o => o.Id == id);
        if (OrderToUpdate == null)
        {
            return NotFound();
        }
        else if (id != order.Id)
        {
            return BadRequest();
        }

        //These are the only properties that we want to make editable
        OrderToUpdate.TakenByEmployeeId = order.TakenByEmployeeId;
        OrderToUpdate.DeliveredByEmployeeId = order.DeliveredByEmployeeId;


        _dbContext.SaveChanges();

        return NoContent();
    }


    
[HttpPut("{id}/recalculate-total")]
public async Task<IActionResult> RecalculateTotal(int id)
{
    var order = await _dbContext.Orders
        .Include(o => o.Pizzas)
        .FirstOrDefaultAsync(o => o.Id == id);

    if (order == null) return NotFound();

    decimal pizzaTotal = order.Pizzas.Sum(p => p.TotalPizzaPrice);
    decimal tip = order.TipAmount ?? 0;
    decimal deliveryFee = order.DeliveredByEmployeeId.HasValue ? 5.00m : 0.00m;

    order.TotalCost = pizzaTotal + tip + deliveryFee;
    await _dbContext.SaveChangesAsync();

    return Ok(new { order.Id, order.TotalCost });
}
    
}