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
public class PizzaSizeController : ControllerBase
{
    private ShepardsPiesDbContext _dbContext;


    public PizzaSizeController(ShepardsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var PizzaSizes = _dbContext.PizzaSizes;
        return Ok(PizzaSizes);
    }

}