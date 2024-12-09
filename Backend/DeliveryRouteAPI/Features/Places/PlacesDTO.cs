namespace DeliveryRouteAPI.Features.Places;

public class PlacesDTO
{
	public class AutoCompleteResponse
	{
		public List<Suggestion> Suggestions { get; set; }
		public class Suggestion
		{
			public string Label { get; set; }
			public string PlaceId { get; set; }
		}
	}

	public class PlaceResponse
	{
		public double Lat { get; set; }
		public double Long { get; set; }
	}
}
