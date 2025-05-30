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
public class EmployeeController : ControllerBase
{
    private ShepardsPiesDbContext _dbContext;


    public EmployeeController(ShepardsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult Get()
    {
        var Employees = _dbContext.Employees;
        return Ok(Employees);
    }
}