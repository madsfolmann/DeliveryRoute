namespace DeliveryRouteAPI.Features.Route;

public class GoogleRouteApiModel
{
	public class Request
	{
		public Origin Origin { get; set; }
		public Destination Destination { get; set; }
		public List<Intermediate> Intermediates { get; set; }
		public string TravelMode { get; set; }
		public string RoutingPreference { get; set; }
		public string DepartureTime { get; set; }
		public bool ComputeAlternativeRoutes { get; set; }
		public RouteModifiers RouteModifiers { get; set; }
		public string LanguageCode { get; set; }
		public string Units { get; set; }
	}
	public class Response
	{
		public List<Route> Routes { get; set; }
		public ErrorResponse Error { get; set; }
		public class ErrorResponse
		{
			public int Code { get; set; }
			public string Message { get; set; }
			public string Status { get; set; }
		}
	}
	public class LatLng
	{
		public double Latitude { get; set; }
		public double Longitude { get; set; }
	}

	public class Location
	{
		public LatLng LatLng { get; set; }
	}

	public class Origin
	{
		public Location Location { get; set; }
	}

	public class Destination
	{
		public Location Location { get; set; }
	}
	public class Intermediate
	{
		public Location Location { get; set; }
	}

	public class RouteModifiers
	{
		public bool AvoidTolls { get; set; }
		public bool AvoidHighways { get; set; }
		public bool AvoidFerries { get; set; }
	}

	public class Route
	{
		public List<Leg> Legs { get; set; }
	}

	public class Leg
	{
		public int DistanceMeters { get; set; }
		public string Duration { get; set; }
		public string StaticDuration { get; set; }
		public Polyline Polyline { get; set; }
		public Location StartLocation { get; set; }
		public Location EndLocation { get; set; }
		public List<Step> Steps { get; set; }
	}

	public class Polyline
	{
		public string EncodedPolyline { get; set; }
	}

	public class Step
	{
		public int DistanceMeters { get; set; }
		public string StaticDuration { get; set; }
		public Polyline Polyline { get; set; }
		public Location StartLocation { get; set; }
		public Location EndLocation { get; set; }
	}
}
