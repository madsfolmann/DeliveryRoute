import { useEffect } from "react";
import { useRouteStore } from "../../stores/useRouteStore";
import { useRouteApi } from "../../api/Route/useRouteApi";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";

const googleMapsapiKey = process.env.REACT_APP_GOOGLE_API_KEY!;
const libraries: Libraries = ["geometry"];

export const useMap = () => {
  const {
    route,
    startLoc,
    deliveryPoints,
    changes,
    updateRoute,
    resetRoute,
    setChangesFalse,
    updateDeliveryPoints,
    mapCenter,
  } = useRouteStore();
  const { fetchRoute, fetchOptimizedRoute } = useRouteApi();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsapiKey,
    libraries: libraries,
  });

  useEffect(() => {
    if (!changes) return;

    if (startLoc && deliveryPoints.length > 0) {
      (async () => {
        let optimizedRoute;
        try {
          optimizedRoute = await fetchOptimizedRoute({
            startLoc: startLoc,
            deliveryPoints: deliveryPoints,
          });
        } catch (error) {
          return;
        }
        const optimizedWithLabels = optimizedRoute.deliveryPoints.map(
          (point) => {
            const matchingPoint = deliveryPoints.find(
              (dp) => dp.guid === point.guid
            );
            if (!matchingPoint)
              throw new Error(`GUID ${point.guid} not found in deliveryPoints`);
            return {
              ...point,
              label: matchingPoint.label,
            };
          }
        );
        updateDeliveryPoints(optimizedWithLabels);
        setChangesFalse();

        try {
          const route = await fetchRoute({
            startLoc: startLoc,
            deliveryPoints: optimizedWithLabels,
          });
          updateRoute(route);
        } catch (error) {}
      })();
    } else {
      resetRoute();
    }
  }, [changes]);

  return { route, startLoc, mapCenter, isLoaded };
};
