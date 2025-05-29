namespace ShepardsPiesAPI.Models.DTO;


    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeliverer { get; set; }
        public List<Order> OrdersTaken { get; set; }
        public List<Order> OrdersDelivered { get; set; }
    }
