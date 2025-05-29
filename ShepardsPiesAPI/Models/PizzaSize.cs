namespace ShepardsPiesAPI.Models;


    public class PizzaSize
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Diameter { get; set; }
        public decimal Price { get; set; }

        public List<Pizza> Pizzas { get; set; }
    }
