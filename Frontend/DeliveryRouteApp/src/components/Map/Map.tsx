import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { MapDirectionLeg } from "./MapDirectionLeg";
import { useMap } from "./useMap";

export const Map: React.FC = () => {
  const { route, startLoc, mapCenter, isLoaded } = useMap();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={mapCenter}
      zoom={14}
      options={{
        disableDefaultUI: true,
      }}
    >
      {startLoc && (
        <MarkerF
          position={{
            lat: startLoc.lat,
            lng: startLoc.long,
          }}
        />
      )}
      {route.directions.map((direction, index) => (
        <MapDirectionLeg direction={direction} index={index} key={index} />
      ))}
    </GoogleMap>
  );
};
