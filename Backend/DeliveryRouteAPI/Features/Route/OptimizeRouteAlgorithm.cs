namespace DeliveryRouteAPI.Features.Route;

public static class OptimizeRouteAlgorithm
{
	public static RouteAddress[] OptimizeRoute(RouteAddress startLoc, RouteAddress[] deliveryPoints, CancellationToken ctoken)
	{
		var route = new List<RouteAddress>();
		var remainingPoints = new List<RouteAddress>(deliveryPoints);

		var currentLocation = startLoc;

		while (remainingPoints.Count > 0)
		{
			ctoken.ThrowIfCancellationRequested();

			var nearestPoint = GetNearestNeighbor(currentLocation, remainingPoints);
			route.Add(nearestPoint);
			remainingPoints.Remove(nearestPoint);
			currentLocation = nearestPoint;
		}

		return route.ToArray();
	}

	private static RouteAddress GetNearestNeighbor(RouteAddress currentLoc, List<RouteAddress> remainingPoints)
	{
		RouteAddress nearestPoint = null;
		double shortestDistance = double.MaxValue;

		foreach (var point in remainingPoints)
		{
			var distance = GetDistance(currentLoc, point);
			if (distance < shortestDistance)
			{
				nearestPoint = point;
				shortestDistance = distance;
			}
		}

		return nearestPoint;
	}

	private static double GetDistance(RouteAddress point1, RouteAddress point2)
	{
		var earthRadius = 6371; // km
		var dLat = ToRadians(point2.Lat - point1.Lat);
		var dLon = ToRadians(point2.Long - point1.Long);

		var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
				Math.Cos(ToRadians(point1.Lat)) * Math.Cos(ToRadians(point2.Lat)) *
				Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

		var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

		return earthRadius * c; // Return distance in kilometers
	}

	private static double ToRadians(double degrees)
	{
		return degrees * Math.PI / 180;
	}
}
