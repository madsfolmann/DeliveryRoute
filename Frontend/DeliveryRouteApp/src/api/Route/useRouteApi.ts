import {
  OptimizeRouteRequest,
  OptimizeRouteResponse,
  RouteRequest,
  RouteResponse,
} from "./types";

const routeApiUrl = process.env.REACT_APP_BACKEND_URL + "/route";

type ErrorResponse = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  traceId: string;
};

export const useRouteApi = () => {
  const fetchRoute = async (body: RouteRequest): Promise<RouteResponse> => {
    try {
      const response = await fetch(routeApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        alert(
          `An error occurred. Please try again or contact support with Trace ID: ${errorData.traceId}`
        );
      }

      return response.json();
    } catch (error) {
      alert(
        `An error occurred. Please try again later. If the problem persists, contact support.`
      );
      throw error;
    }
  };

  const fetchOptimizedRoute = async (
    body: OptimizeRouteRequest
  ): Promise<OptimizeRouteResponse> => {
    try {
      const response = await fetch(`${routeApiUrl}/optimize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        alert(
          `An error occurred. Please try again or contact support with Trace ID: ${errorData.traceId}`
        );
      }

      return response.json();
    } catch (error) {
      alert(
        `An error occurred. Please try again later. If the problem persists, contact support.`
      );
      throw error;
    }
  };

  return { fetchRoute, fetchOptimizedRoute };
};
