import { create } from "zustand";

interface RouteAddress {
  guid: string;
  label: string;
  lat: number;
  long: number;
}

interface Route {
  totalDistanceMeters: number;
  totalDurationSeconds: number;
  directions: {
    distanceMeters: number;
    durationSeconds: number;
    encodedPolyline: string;
  }[];
}

interface RouteStore {
  changes: boolean;
  startLoc: RouteAddress | null;
  deliveryPoints: RouteAddress[];
  route: Route;
  mapCenter: google.maps.LatLngLiteral;
  addLocation: (location: RouteAddress) => void;
  removeLocation: (guid: string) => void;
  updateRoute: (route: Route) => void;
  resetRoute: () => void;
  setChangesFalse: () => void;
  setMapCenter: (lat: number, long: number) => void;
  updateDeliveryPoints: (list: RouteAddress[]) => void;
}

export const useRouteStore = create<RouteStore>((set) => ({
  mapCenter: {
    lat: 55.66227731315183,
    lng: 12.577925975279395,
  },
  changes: false,
  startLoc: null,
  deliveryPoints: [],
  route: {
    totalDistanceMeters: 0,
    totalDurationSeconds: 0,
    directions: [],
  },
  addLocation: (location) =>
    set((state) => {
      if (!state.startLoc) {
        return { ...state, startLoc: location, changes: true };
      } else {
        return {
          ...state,
          deliveryPoints: [...state.deliveryPoints, location],
          changes: true,
        };
      }
    }),
  removeLocation: (guid) =>
    set((state) => {
      if (state.startLoc?.guid === guid) {
        const [firstDeliveryPoint, ...remainingPoints] = state.deliveryPoints;
        return {
          ...state,
          startLoc: firstDeliveryPoint,
          deliveryPoints: remainingPoints,
          changes: true,
        };
      } else {
        return {
          ...state,
          deliveryPoints: state.deliveryPoints.filter(
            (point) => point.guid !== guid
          ),
          changes: true,
        };
      }
    }),
  setChangesFalse: () => set({ changes: false }),
  setMapCenter: (lat: number, long: number) =>
    set({
      mapCenter: {
        lat: lat,
        lng: long,
      },
    }),
  updateDeliveryPoints: (list) => set({ deliveryPoints: list }),
  updateRoute: (newRoute) =>
    set((state) => ({
      ...state,
      route: newRoute,
    })),
  resetRoute: () =>
    set((state) => ({
      ...state,
      changes: false,
      route: {
        totalDistanceMeters: 0,
        totalDurationSeconds: 0,
        directions: [],
      },
    })),
}));
