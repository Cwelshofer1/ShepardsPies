namespace ShepardsPiesAPI.Models.DTO;


    public class CustomerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNum { get; set; }

        public List<Order> Orders { get; set; }
    }
