namespace ShepardsPiesAPI.Models.DTO;


public class PizzaDTO
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int PizzaSizeId { get; set; }
    public int PizzaCheeseId { get; set; }
    public int PizzaSauceId { get; set; }
    public decimal TotalPizzaPrice { get; set; }

    public Order Order { get; set; }
    public PizzaSize PizzaSize { get; set; }
    public CheeseType PizzaCheese { get; set; }
    public SauceType PizzaSauce { get; set; }
    public List<PizzaTopping> PizzaToppings { get; set; }
    public Topping Topping { get; set; }
    
    }
