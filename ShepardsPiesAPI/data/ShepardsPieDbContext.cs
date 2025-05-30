using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ShepardsPiesAPI.Models;
using System;

namespace ShepardsPiesAPI.Data;


public class ShepardsPiesDbContext : IdentityDbContext<IdentityUser>

{
    private readonly IConfiguration _configuration;
    public DbSet<Order> Orders { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<PizzaSize> PizzaSizes { get; set; }
    public DbSet<PizzaTopping> PizzaTopping { get; set; }
    public DbSet<CheeseType> CheeseTypes { get; set; }
    public DbSet<SauceType> SauceTypes { get; set; }
    public DbSet<Topping> Toppings { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }

    public ShepardsPiesDbContext(DbContextOptions<ShepardsPiesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

        // Composite PK for join table
        modelBuilder.Entity<PizzaTopping>()
         .HasKey(pt => new { pt.PizzaId, pt.ToppingId });

        // Employees
        modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = 1, Name = "Joe", IsDeliverer = false },
                new Employee { Id = 2, Name = "Frankie", IsDeliverer = true }
            );

        // Customers
        modelBuilder.Entity<Customer>().HasData(
            new Customer { Id = 1, Name = "Claudia Romano", PhoneNum = "5551234567" }
        );

        // Orders
        modelBuilder.Entity<Order>().HasData(
            new Order
            {
                Id = 1,
                TableNumber = 12,
                CustomerId = 1,
                TakenByEmployeeId = 1,
                DeliveredByEmployeeId = null,
                TipAmount = 4.00m,
                TotalCost = 27.00m
            }
        );

        // Pizza Sizes
        modelBuilder.Entity<PizzaSize>().HasData(
            new PizzaSize { Id = 1, Name = "Small", Diameter = 10, Price = 10.00m },
            new PizzaSize { Id = 2, Name = "Medium", Diameter = 14, Price = 12.00m },
            new PizzaSize { Id = 3, Name = "Large", Diameter = 18, Price = 15.00m }
        );

        // Cheese Types
        modelBuilder.Entity<CheeseType>().HasData(
            new CheeseType { Id = 1, Name = "Buffalo Mozzarella" },
            new CheeseType { Id = 2, Name = "Four Cheese" },
            new CheeseType { Id = 3, Name = "Vegan" },
            new CheeseType { Id = 4, Name = "None" }
        );

        // Sauce Types
        modelBuilder.Entity<SauceType>().HasData(
            new SauceType { Id = 1, Name = "Marinara" },
            new SauceType { Id = 2, Name = "Arrabbiata" },
            new SauceType { Id = 3, Name = "Garlic White" },
            new SauceType { Id = 4, Name = "None" }
        );

        // Toppings
        modelBuilder.Entity<Topping>().HasData(
            new Topping { Id = 1, Name = "Sausage", ToppingPrice = 0.50m },
            new Topping { Id = 2, Name = "Pepperoni", ToppingPrice = 0.50m },
            new Topping { Id = 3, Name = "Mushroom", ToppingPrice = 0.50m },
            new Topping { Id = 4, Name = "Onion", ToppingPrice = 0.50m },
            new Topping { Id = 5, Name = "Green Pepper", ToppingPrice = 0.50m },
            new Topping { Id = 6, Name = "Black Olive", ToppingPrice = 0.50m },
            new Topping { Id = 7, Name = "Basil", ToppingPrice = 0.50m },
            new Topping { Id = 8, Name = "Extra Cheese", ToppingPrice = 0.50m }
        );

        // Pizzas
        modelBuilder.Entity<Pizza>().HasData(
            new Pizza
            {
                Id = 1,
                OrderId = 1,
                PizzaSizeId = 2,
                PizzaCheeseId = 1,
                PizzaSauceId = 1,
                TotalPizzaPrice = 12.50m
            }
        );

        // Pizza Toppings
        modelBuilder.Entity<PizzaTopping>().HasData(
            new PizzaTopping { PizzaId = 1, ToppingId = 2 }, // Pepperoni
            new PizzaTopping { PizzaId = 1, ToppingId = 3 }  // Mushroom
        );

    }
}

