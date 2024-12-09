import { MarkerF, PolylineF } from "@react-google-maps/api";
import React from "react";

export const MapDirectionLeg: React.FC<{
  direction: {
    distanceMeters: number;
    durationSeconds: number;
    encodedPolyline: string;
  };
  index: number;
}> = ({ direction, index }) => {
  const stopNumber: number = index + 1;
  const decodedPath = google.maps.geometry.encoding.decodePath(
    direction.encodedPolyline
  );

  const endLocation = decodedPath[decodedPath.length - 1];

  return (
    <React.Fragment>
      <PolylineF
        path={decodedPath}
        options={{
          strokeColor: "#0368e2	",
          strokeOpacity: 1,
          strokeWeight: 4,
        }}
      />
      <MarkerF
        key={"marker" + index.toString()}
        position={endLocation}
        label={{
          text: `${stopNumber.toString()}`,
          color: "black",
          fontSize: "14px",
        }}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 25,
          fillColor: "white",
          fillOpacity: 1,
          strokeColor: "#bfdbfe",
          strokeWeight: 4,
        }}
      />
    </React.Fragment>
  );
};
