using System.Text;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DeliveryRouteAPI.Features.Route;
[Route("api/route")]
[ApiController] // Automatically checks modelstate 
public class Route(IConfiguration config, HttpClient httpClient) : ControllerBase
{
	private readonly string googleApiKey = config["GoogleApiKey"];
	private readonly HttpClient _httpClient = httpClient;
	private readonly int googleRouteIntermediateWaypointsLimit = 5; //For demonstration purposes in frontend, the actual limit is 25

	[HttpPost]
	public async Task<IActionResult> GetRoute([FromBody] RouteDTO.RouteRequest req, CancellationToken ctoken)
	{
		if (req.DeliveryPoints.Length > googleRouteIntermediateWaypointsLimit)
		{
			var problemDetails = new ProblemDetails
			{
				Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
				Title = "Too many delivery points",
				Status = (int)StatusCodes.Status400BadRequest,
				Detail = $"Only {googleRouteIntermediateWaypointsLimit} delivery points is allowed!"
			};
			return BadRequest(problemDetails);
		}

		var startLoc = req.StartLoc;
		var deliveryPoints = req.DeliveryPoints;

		var googleRouteRequest = new GoogleRouteApiModel.Request
		{
			Origin = new GoogleRouteApiModel.Origin
			{
				Location = new GoogleRouteApiModel.Location
				{
					LatLng = new GoogleRouteApiModel.LatLng
					{
						Latitude = startLoc.Lat,
						Longitude = startLoc.Long,
					}
				}
			},
			Destination = new GoogleRouteApiModel.Destination
			{
				Location = new GoogleRouteApiModel.Location
				{
					LatLng = new GoogleRouteApiModel.LatLng
					{
						Latitude = deliveryPoints.Last().Lat,
						Longitude = deliveryPoints.Last().Long,
					}
				}
			},
			Intermediates = deliveryPoints.Take(deliveryPoints.Length - 1)
				.Select(dp => new GoogleRouteApiModel.Intermediate
				{
					Location = new GoogleRouteApiModel.Location
					{
						LatLng = new GoogleRouteApiModel.LatLng
						{
							Latitude = dp.Lat,
							Longitude = dp.Long
						}
					}
				})
				.ToList(),
			TravelMode = "DRIVE",
			RoutingPreference = "TRAFFIC_AWARE",
			ComputeAlternativeRoutes = false,
			RouteModifiers = new GoogleRouteApiModel.RouteModifiers
			{
				AvoidTolls = false,
				AvoidHighways = false,
				AvoidFerries = false
			},
			LanguageCode = "en-US",
			Units = "IMPERIAL"
		};

		var content = new StringContent(
			JsonConvert.SerializeObject(googleRouteRequest,
				new JsonSerializerSettings
				{
					ContractResolver = new CamelCasePropertyNamesContractResolver()
				}),
			Encoding.UTF8, "application/json"
		);

		var request = new HttpRequestMessage(HttpMethod.Post, "https://routes.googleapis.com/directions/v2:computeRoutes")
		{
			Content = content
		};
		request.Headers.Add("X-Goog-Api-Key", googleApiKey);
		request.Headers.Add("X-Goog-FieldMask", "routes.duration,routes.distanceMeters,routes.legs");

		var response = await _httpClient.SendAsync(request, ctoken);
		var responseContent = await response.Content.ReadAsStringAsync(ctoken);
		var json = JsonConvert.DeserializeObject<GoogleRouteApiModel.Response>(responseContent);

		// Handle unexpected errors from Google Route API
		// The frontend autocomplete ensures valid user input, so any non-OK response 
		// is considered an unexpected error from the API rather than a user fault.
		if (response.StatusCode != System.Net.HttpStatusCode.OK)
		{
			string errorMessage = json.Error.Message;
			throw new Exception($"From Google Route Api: {errorMessage}");
		}

		// Retrieve the first route from the response
		// The API returns the route in list form, although only one route is returned from Google.
		var firstRouteFromList = json.Routes.First();
		var directions = firstRouteFromList.Legs
			.Select((routeLeg, index) => new RouteDTO.Direction
			{
				DistanceMeters = routeLeg.DistanceMeters,
				DurationSeconds = int.Parse(routeLeg.Duration.Replace("s", "")),
				EncodedPolyline = routeLeg.Polyline.EncodedPolyline
			})
			.ToList();

		var result = new RouteDTO.RouteResponse
		{
			Directions = directions,
			TotalDistanceMeters = directions.Sum(d => d.DistanceMeters),
			TotalDurationSeconds = directions.Sum(d => d.DurationSeconds)
		};

		return Ok(result);
	}

	[HttpPost("optimize")]
	public async Task<IActionResult> OptimizeRoute([FromBody] RouteDTO.OptimizeRequest req, CancellationToken ctoken)
	{
		if (req.DeliveryPoints.Length > googleRouteIntermediateWaypointsLimit)
		{
			var problemDetails = new ProblemDetails
			{
				Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
				Title = "Too many delivery points",
				Status = (int)StatusCodes.Status400BadRequest,
				Detail = $"Only {googleRouteIntermediateWaypointsLimit} delivery points is allowed!"
			};
			return BadRequest(problemDetails);
		}

		var optimizedRoute = OptimizeRouteAlgorithm.OptimizeRoute(req.StartLoc, req.DeliveryPoints, ctoken);
		return Ok(new RouteDTO.OptimizeResponse { DeliveryPoints = optimizedRoute });
	}
}