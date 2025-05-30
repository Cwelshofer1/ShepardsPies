namespace ShepardsPiesAPI.Models.DTO;


    public class PizzaToppingDTO
    {
        public int PizzaId { get; set; }
        public int ToppingId { get; set; }

        public Pizza Pizza { get; set; }
        public Topping Topping { get; set; }
    }

