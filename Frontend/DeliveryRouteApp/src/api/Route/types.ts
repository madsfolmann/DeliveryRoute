export interface RouteAddress {
  guid: string;
  lat: number;
  long: number;
}

export interface RouteRequest {
  startLoc: RouteAddress;
  deliveryPoints: RouteAddress[];
}

export interface RouteResponse {
  totalDistanceMeters: number;
  totalDurationSeconds: number;
  directions: {
    distanceMeters: number;
    durationSeconds: number;
    encodedPolyline: string;
  }[];
}

export interface OptimizeRouteRequest {
  startLoc: RouteAddress;
  deliveryPoints: RouteAddress[];
}

export interface OptimizeRouteResponse {
  deliveryPoints: RouteAddress[];
}
