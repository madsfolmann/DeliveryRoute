import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePlacesApi } from "../../../api/Places/usePlacesApi";
import { useRouteStore } from "../../../stores/useRouteStore";

const routeApiDeliveryPointsLimit: number = 5;

interface AddressSuggestion {
  label: string;
  placeId: string;
}

export const useAddressAutocomplete = () => {
  const { addLocation, setMapCenter, deliveryPoints } = useRouteStore();
  const { fetchSuggestions, fetchPlaceDetails } = usePlacesApi();

  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<AddressSuggestion | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = async (
    event: React.SyntheticEvent | null,
    stringValue: string
  ) => {
    if (event?.type !== "change") return;

    setInputValue(stringValue);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    if (stringValue.trim()) {
      typingTimeout.current = setTimeout(async () => {
        try {
          const response = await fetchSuggestions(stringValue);
          setAddressSuggestions(response.suggestions);
        } catch (err) {
          setAddressSuggestions([]);
        }
      }, 700);
    } else {
      setAddressSuggestions([]);
    }
  };

  const handleSelection = async (
    event: React.SyntheticEvent,
    addressSuggestion: AddressSuggestion | null
  ) => {
    if (addressSuggestion) {
      try {
        const placeDetails = await fetchPlaceDetails(addressSuggestion.placeId);
        addLocation({
          guid: uuidv4(),
          label: addressSuggestion.label,
          lat: placeDetails.lat,
          long: placeDetails.long,
        });
        setMapCenter(placeDetails.lat, placeDetails.long);
        setAddressSuggestions([]);
        setInputValue("");
        setValue(null);
      } catch (error) {}
    }
  };

  return {
    addressSuggestions,
    inputValue,
    value,
    handleInputChange,
    handleSelection,
    isDisabled: deliveryPoints.length >= routeApiDeliveryPointsLimit,
  };
};
