import { Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MapContainer, CircleMarker } from "react-leaflet";
import { TileLayer } from "react-leaflet";

const RoadWorkOnMap = () => {
  const location = useLocation();
  const params_start = new URLSearchParams(location.state.coords[0]);
  const params_end = new URLSearchParams(location.state.coords[1]);

  let joo = false;
  console.log(params_end.get("x_end"));
  for (const value of params_end.values()) {
    console.log(value);
    if (value !== "undefined") {
      joo = true;
    }
  }
  let navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: "/roadworks" });
  };
  return (
    <>
      <Button variant="contained" sx={{ margin: 3 }} onClick={handleClick}>
        Go back
      </Button>
      <MapContainer
        className="map"
        center={[params_start.get("x_start"), params_start.get("y_start")]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={[params_start.get("x_start"), params_start.get("y_start")]}
          color="#000000"
          opacity={0.75}
          radius={10}
        />
        {joo === true && (
          <CircleMarker
            center={[params_end.get("x_end"), params_end.get("y_end")]}
            color="#000000"
            opacity={0.75}
            radius={10}
          />
        )}
      </MapContainer>
    </>
  );
};

export default RoadWorkOnMap;
