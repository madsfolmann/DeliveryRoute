import { AutoCompleteResponse, PlaceResponse } from "./types";

const placesApiUrl = process.env.REACT_APP_BACKEND_URL + "/places";

export const usePlacesApi = () => {
  const fetchSuggestions = async (
    phrase: string
  ): Promise<AutoCompleteResponse> => {
    try {
      const response = await fetch(`${placesApiUrl}?phrase=${phrase}`);

      if (!response.ok) {
        const errorData = await response.json();
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

  const fetchPlaceDetails = async (placeId: string): Promise<PlaceResponse> => {
    try {
      const response = await fetch(`${placesApiUrl}/${placeId}`);

      if (!response.ok) {
        const errorData = await response.json();
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

  return { fetchSuggestions, fetchPlaceDetails };
};
