namespace DeliveryRouteAPI.Features.Places;

public class GooglePlacesApiModel
{
	public class Response
	{
		public List<string> HtmlAttributions { get; set; }
		public Result Result { get; set; }
		public string Status { get; set; }
		public string ErrorMessage { get; set; }
	}
	public class Geometry
	{
		public Location Location { get; set; }
		public Viewport Viewport { get; set; }
	}

	public class Location
	{
		public double Lat { get; set; }
		public double Lng { get; set; }
	}

	public class Viewport
	{
		public Location Northeast { get; set; }
		public Location Southwest { get; set; }
	}

	public class Result
	{
		public Geometry Geometry { get; set; }
	}
}
