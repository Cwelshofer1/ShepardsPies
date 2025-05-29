namespace ShepardsPiesAPI.Models;


    public class CheeseType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Pizza> Pizzas { get; set; }
    }
