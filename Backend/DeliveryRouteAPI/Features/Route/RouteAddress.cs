using System.ComponentModel.DataAnnotations;

namespace DeliveryRouteAPI.Features.Route;

public class RouteAddress
{
    public string Guid { get; set; }
    [Range(-90, 90)]
    public double Lat { get; set; }
    [Range(-90, 90)]
    public double Long { get; set; }
}
