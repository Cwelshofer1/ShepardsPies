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
        .Include(c => c.Customer);
        return Ok(orders);
    }

    [HttpPost]
    public async Task<IActionResult> Post(OrderCreateDTO dto)
    {
        var PostOrder = new Order
        {
            TableNumber = dto.TableNumber,
            Customer = await _dbContext.Customers.FindAsync(dto.CustomerId),
            TakenByEmployee = await _dbContext.Employees.FindAsync(dto.TakenByEmployeeId),
            DeliveredByEmployee = dto.DeliveredByEmployeeId.HasValue
                ? await _dbContext.Employees.FindAsync(dto.DeliveredByEmployeeId.Value)
                : null,
            TipAmount = dto.TipAmount,
            TotalCost = dto.TotalCost
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

}