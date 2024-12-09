using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DeliveryRouteAPI.Features.Places;

[Route("api/places")]
[ApiController] // Automatically checks modelstate 
public class Places(IConfiguration config, HttpClient httpClient) : ControllerBase
{
	private readonly string googleApiKey = config["GoogleApiKey"];
	private readonly HttpClient _httpClient = httpClient;

	[HttpGet]
	public async Task<IActionResult> GetSuggestions([FromQuery] string phrase, CancellationToken ctoken)
	{
		var response = await _httpClient.GetAsync(
			$"https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input={Uri.EscapeDataString(phrase)}&key={googleApiKey}",
			ctoken
		);

		var responseContent = await response.Content.ReadAsStringAsync(ctoken);
		var json = JsonConvert.DeserializeObject<GoogleAutoCompleteApiModel.Response>(responseContent,
			new JsonSerializerSettings
			{
				ContractResolver = new DefaultContractResolver
				{
					NamingStrategy = new SnakeCaseNamingStrategy()
				}
			}
		);

		// Handle unexpected errors from Google AutoComplete API
		if (json.ErrorMessage != null)
		{
			string errorMessage = json.ErrorMessage;
			throw new Exception($"Error from Google AutoComplete API: {errorMessage}");
		}

		var result = new PlacesDTO.AutoCompleteResponse
		{
			Suggestions = json.Predictions.Where(x => x.PlaceId != null).Select(x => new PlacesDTO.AutoCompleteResponse.Suggestion
			{
				Label = x.Description,
				PlaceId = x.PlaceId
			}).ToList()
		};

		return Ok(result);
	}

	[HttpGet("{placeId}")]
	public async Task<IActionResult> GetLocation(string placeId, CancellationToken ctoken)
	{
		var url = $"https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&language=da&place_id={placeId}&key={googleApiKey}";

		var response = await _httpClient.GetAsync(url, ctoken);

		var responseContent = await response.Content.ReadAsStringAsync(ctoken);
		var json = JsonConvert.DeserializeObject<GooglePlacesApiModel.Response>(responseContent,
			new JsonSerializerSettings
			{
				ContractResolver = new DefaultContractResolver
				{
					NamingStrategy = new SnakeCaseNamingStrategy()
				}
			}
		);

		// Handle unexpected errors from Google Places API
		// Since the place IDs are provided directly by Google Autocomplete API, they are assumed to be valid, 
		// and any error message should indicate an application issue.
		if (json.ErrorMessage != null)
		{
			string errorMessage = json.ErrorMessage;
			throw new Exception($"Error from Google Places API: {errorMessage}");
		}

		var location = json.Result.Geometry.Location;
		var result = new PlacesDTO.PlaceResponse
		{
			Lat = location.Lat,
			Long = location.Lng
		};

		return Ok(result);
	}
}
