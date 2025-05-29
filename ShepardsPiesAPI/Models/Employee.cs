using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ShepardsPiesAPI.Models;

public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeliverer { get; set; }
    [NotMapped]
    public List<Order> OrdersTaken { get; set; }
    [NotMapped]
    public List<Order> OrdersDelivered { get; set; }
}
