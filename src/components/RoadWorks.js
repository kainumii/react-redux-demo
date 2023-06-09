import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QUERY_GET_ALL_ROADWORKS = `query GetAllRoadworks {
  roadworks {
    id
    roadworkId
    severity
    status
    startTime
    endTime
    description {
      fi
    }
    geojson
  }
}`;

const RoadWorks = () => {
  const [roadWorks, setRoadWorks] = useState([]);
  const [pos, setPos] = useState(0);

  let navigate = useNavigate();
  let loc = useLocation();

  useEffect(() => {
    fetch("https://api.oulunliikenne.fi/proxy/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY_GET_ALL_ROADWORKS }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRoadWorks(data.data.roadworks);
        console.log(data.data.roadworks);
      });
  }, []);

  useEffect(() => {
    console.log(loc);

    if (roadWorks.length > 0) {
      const pos = sessionStorage.getItem("scrollPosition");
      if (pos) {
        window.scrollTo(0, parseInt(pos, 10));
        sessionStorage.removeItem("scrollPosition");
      }
    }
  }, [roadWorks]);

  // The navigate function takes a second argument options object with state and replace keys.
  // Any data you want to send along with the route transition should be on the state key.
  const onNavigateMapClicked = (x, y, xx, yy) => {
    setPos(window.pageYOffset);

    const coords = [
      { x_start: x, y_start: y },
      { x_end: xx, y_end: yy },
    ];
    navigate(`/roadworkonmap`, { state: { coords } });
  };

  return (
    <>
      <div>
        {roadWorks.map((item) => {
          return (
            <>
              <Card
                sx={{
                  minWidth: 275,
                  backgroundColor: "lightgray",
                  border: 1,
                  borderColor: "black",
                  m: "24px",
                }}
              >
                <CardContent>
                  <Typography variant="body2">
                    {item.description["fi"]}
                  </Typography>
                  <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                    Severity: {item.severity}
                  </Typography>
                  <Typography variant="body2">
                    Ajankohta:{" "}
                    {new Date(item.startTime).toLocaleString("fi-FI")} -{" "}
                    {new Date(item.endTime).toLocaleString("fi-FI")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      {
                        item.geojson["features"].length == 1
                          ? onNavigateMapClicked(
                              item.geojson["features"][0].geometry[
                                "coordinates"
                              ][1],
                              item.geojson["features"][0].geometry[
                                "coordinates"
                              ][0]
                            )
                          : onNavigateMapClicked(
                              item.geojson["features"][0].geometry[
                                "coordinates"
                              ][1],
                              item.geojson["features"][0].geometry[
                                "coordinates"
                              ][0],
                              item.geojson["features"][1].geometry[
                                "coordinates"
                              ][1],
                              item.geojson["features"][1].geometry[
                                "coordinates"
                              ][0]
                            );
                      }

                      sessionStorage.setItem(
                        "scrollPosition",
                        window.pageYOffset
                      );
                    }}
                  >
                    Show on map
                  </Button>
                </CardActions>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};

export default RoadWorks;
