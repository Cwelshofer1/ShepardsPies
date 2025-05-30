namespace ShepardsPiesAPI.Models.DTO;


    public class SauceTypeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Pizza> Pizzas { get; set; }
    }
