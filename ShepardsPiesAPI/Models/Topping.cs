namespace ShepardsPiesAPI.Models;


    public class Topping
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal ToppingPrice { get; set; }

        public List<PizzaTopping> PizzaToppings { get; set; }
    }
