import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
// https://www.liedman.net/leaflet-routing-machine/

const Routing = ({ source, dest }) => {
  const map = useMap();

  console.log(source);
  console.log(dest);
  useEffect(() => {
    if (
      source?.lat === null ||
      source?.lng === null ||
      dest?.lat === null ||
      dest?.lon === null
    )
      return;

    const routing = L.Routing.control({
      waypoints: [
        L.latLng(parseFloat(source.lat), parseFloat(source.lng)),
        L.latLng(parseFloat(dest.lat), parseFloat(dest.lon)),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      show: true,
    }).addTo(map);

    return () => map.removeControl(routing);
  }, [map, source, dest]);

  return null;
};

export default Routing;
