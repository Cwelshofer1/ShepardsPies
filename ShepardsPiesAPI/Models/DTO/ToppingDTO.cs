namespace ShepardsPiesAPI.Models.DTO;


    public class ToppingDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal ToppingPrice { get; set; }

        public List<PizzaTopping> PizzaToppings { get; set; }
    }
