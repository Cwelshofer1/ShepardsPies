namespace ShepardsPiesAPI.Models;


    public class Order
    {
        public int Id { get; set; }
        public int? TableNumber { get; set; }
        public int CustomerId { get; set; }
        public int TakenByEmployeeId { get; set; }
        public int? DeliveredByEmployeeId { get; set; }
        public decimal TipAmount { get; set; }
        public decimal TotalCost { get; set; }

        public Customer Customer { get; set; }
        // public Employee Employee { get; set; }
        public Employee TakenByEmployee { get; set; }
        public Employee DeliveredByEmployee { get; set; }

        public List<Pizza> Pizzas { get; set; }
    }
