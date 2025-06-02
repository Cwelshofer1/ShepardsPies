namespace ShepardsPiesAPI.Models.DTO;


public class PizzaCreateDTO
{
    public int OrderId { get; set; }
    public int PizzaSizeId { get; set; }
    public int PizzaCheeseId { get; set; }
    public int PizzaSauceId { get; set; }
    public decimal TotalPizzaPrice { get; set; }

}