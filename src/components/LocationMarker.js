import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const LocationMarker = ({ chooseCurrentLocation_ }) => {
  const map = useMap();
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      console.log(e.latlng);
      setCurrentPosition(e.latlng);
      map.flyTo(e.latlng);

      chooseCurrentLocation_(e.latlng);
    });
  }, [map]);

  return currentPosition === null ? null : (
    <Marker position={currentPosition} />
  );
};

export default LocationMarker;
