import React from "react";

import { useRouteStore } from "../../stores/useRouteStore";
import { RouteAddress } from "./RouteAddress";
import { AutoCompleteAddress } from "./AutoCompleteAddress/AutoCompleteAddress";

export const PlanRoute: React.FC = () => {
  const { startLoc, deliveryPoints, route } = useRouteStore();

  const totalDistance: number = route.totalDistanceMeters / 1000;
  const totalDuration: number = route.totalDurationSeconds / 60;

  return (
    <React.Fragment>
      <div className="font-extrabold text-4xl m-10 flex justify-center">
        Delivery route
      </div>
      <div className="flex flex-col justify-center gap-4 items-center w-[80%] mx-auto">
        <div className="text-lg">
          <strong>Distance:</strong> {parseFloat(totalDistance.toFixed(2))} km |{" "}
          <strong>Est. time:</strong>{" "}
          {totalDuration > 60
            ? `${(totalDuration / 60).toFixed(1)} hours`
            : `${totalDuration.toFixed(0)} min.`}
        </div>
        <AutoCompleteAddress />
        <div className=" mr-auto gap-2 flex flex-col w-full">
          {startLoc && (
            <RouteAddress
              guid={startLoc.guid}
              label={startLoc.label}
              isStartLoc
            />
          )}
          {deliveryPoints.map((dp, index) => (
            <RouteAddress
              key={dp.guid}
              guid={dp.guid}
              label={dp.label}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
