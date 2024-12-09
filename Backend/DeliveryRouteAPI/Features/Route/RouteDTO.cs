namespace DeliveryRouteAPI.Features.Route;

public class RouteDTO
{
	public class RouteRequest
	{
		public RouteAddress StartLoc { get; set; }
		public RouteAddress[] DeliveryPoints { get; set; }
	}
	public class RouteResponse
	{
		public int TotalDistanceMeters { get; set; }
		public int TotalDurationSeconds { get; set; }
		public List<Direction> Directions { get; set; }
	}
	public class OptimizeRequest
	{
		public RouteAddress StartLoc { get; set; }
		public RouteAddress[] DeliveryPoints { get; set; }
	}
	public class OptimizeResponse
	{
		public RouteAddress[] DeliveryPoints { get; set; }
	}

	public class Direction
	{
		public int DistanceMeters { get; set; }
		public int DurationSeconds { get; set; }
		public string EncodedPolyline { get; set; }
	}
}
