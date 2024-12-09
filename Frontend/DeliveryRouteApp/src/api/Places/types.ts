export interface AutoCompleteResponse {
  suggestions: {
    label: string;
    placeId: string;
  }[];
}

export interface PlaceResponse {
  lat: number;
  long: number;
}
