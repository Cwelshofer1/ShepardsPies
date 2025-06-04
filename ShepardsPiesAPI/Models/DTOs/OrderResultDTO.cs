namespace ShepardsPiesAPI.Modelo.DTOs
{
    public class OrderResultsDTO
    {
        public int Id { get; set; }
        public int? TableNumber { get; set; }
        public int? CustomerId { get; set; }
        public int? TakenByEmployeeId { get; set; }
        public int? DeliveredByEmployeeId { get; set; }
        public decimal? TipAmount { get; set; }
        public decimal? TotalCost { get; set; }
        public DateTime OrderDate { get; set; }
    }
}