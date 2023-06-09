import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "../styles/styles.css";

import Box from "@mui/material/Box";
import LocationMarker from "./LocationMarker";
import Routing from "./Routing";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// https://api.oulunliikenne.fi/proxy/graphql
const QUERY = `query GetAllCarParks {
  carParks {
    carParkId
    name
    lat
    lon
    maxCapacity
    spacesAvailable
    realtime
    pricing {
      title {
        fi
      }
      value {
        fi
      }
    }
  }
}`;

const ParkingSpaces = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  // const [activeRow, setActiveRow] = useState(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [carParkId, setCarParkId] = useState(null);
  const [cities, setCities] = useState([]);

  // const [citiesLoaded, setCitiesLoaded] = useState(false);
  // const [parkingSpacesLoaded, setParkingSpaciesLoaded] = useState(false);

  const [selectedDestination, setSelectedDestination] = useState({});
  const [showNavigationRoute, setShowNavigationRoute] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({});

  const chooseCurrentLocation = (loc) => {
    console.log(loc);
    setCurrentLocation(loc);
  };

  useEffect(() => {
    fetch("https://api.oulunliikenne.fi/proxy/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        setParkingSpaces(data.data.carParks);
        // setParkingSpaciesLoaded(true);
        console.log(data.data.carParks);
      });
  }, []);

  useEffect(() => {
    axios
      .get("data.json")
      .then((res) => {
        setCities(res.data);
        console.log(res.data);
        // setCitiesLoaded(true);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    "&:la st-child td, &:last-child th": {
      border: 0,
    },
  }));

  const onCircleMarkerClicked = (id) => {
    setCarParkId(id);
    setIsOpen(true);
  };

  const ALMOST_FULL_PARKINGSPACE = 30;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "5px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const citiesOptions = cities.map((option) => {
    const firstLetter = option.city[0];
    return { firstLetter, ...option };

    // return {
    //   firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
    //   ...option,
    // };
  });

  return (
    <>
      <Typography sx={{ m: 3 }} variant="h6">
        GraphQlDemo
      </Typography>
      <Typography sx={{ m: 3 }} variant="body1">
        GraphQL on suunniteltu käytettävän siihen tarkoitetuilla
        ohjelmistokehityspaketeilla jotka sisältävät toimintoja kuten kutsujen
        validointia sekä kutsujen niputtamista. Hakuja voi myös tehdä suoraan
        HTTP POST kutsuilla, milloin itse haku liitetään kutsun body kenttään.
      </Typography>
      <Typography sx={{ m: 3 }} variant="body1">
        Yleisesti käytetyt GraphQL-ohjelmistokehityspaketit:
      </Typography>
      <ul>
        <li>Apollo</li>
        <li>Relay</li>
      </ul>

      <Typography sx={{ m: 3 }} variant="h6">
        Pysäköintitalojen tilatiedot
      </Typography>
      <Typography sx={{ m: 3 }} variant="body1">
        Oulun alueen pysäköintitalot ja ajantasaiset tilatiedot. Oulun kaupungin
        16 pysäköintitalosta on saatavilla tiedot pysäköintipaikkojen määristä
        sekä vapaina olevista paikoista. Tämän lisäksi osasta pysäköintitaloista
        löytyy tiedot pysäköintihinnoista. Tilatietoja päivitetään 5-20 minuutin
        välein pysäköintitalosta riippuen.
      </Typography>

      <TableContainer sx={{ m: 3, width: "96%" }} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Parking Space</StyledTableCell>
              <StyledTableCell align="right">Lat</StyledTableCell>
              <StyledTableCell align="right">Lon</StyledTableCell>
              <StyledTableCell align="right">Max Capacity</StyledTableCell>
              <StyledTableCell align="right">Spaces available</StyledTableCell>
              {/* If true, value of 'spacesAvailable' is updated from a real-time
              source */}
              <StyledTableCell align="right">Realtime</StyledTableCell>
              <StyledTableCell align="right">Pricing</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parkingSpaces
              // .filter((v) => v.lat !== null)
              // .filter((v) => v.lon !== null)
              // .filter((v) => v.maxCapacity !== null)
              .filter(
                (ele, ind) =>
                  ind ===
                  parkingSpaces.findIndex((elem) => elem.name === ele.name)
              )
              .filter((x) => x.lat !== null)
              .filter((x) => x.maxCapacity !== null)
              .map((row) => (
                <StyledTableRow
                  key={row.carParkId}
                  sx={{
                    backgroundColor:
                      row.spacesAvailable < ALMOST_FULL_PARKINGSPACE
                        ? "lightpink"
                        : "lightgreen",
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.lat}</StyledTableCell>
                  <StyledTableCell align="right">{row.lon}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.maxCapacity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.spacesAvailable}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.realtime.toString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.pricing !== null && row.pricing[0].value.fi}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div sx={{ m: 2 }}>
        <Stack direction="row" spacing={2} marginLeft={3}>
          <Autocomplete
            aria-sort="ascending"
            disablePortal
            id="combo-box-demo"
            onChange={(e, value) => {
              if (value === null) {
                setSelectedDestination(null);
                setShowNavigationRoute(false);
              } else {
                setSelectedDestination(value);
                setShowNavigationRoute(true);
              }
            }}
            sx={{ width: 300 }}
            options={parkingSpaces}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Parking Space to Navigate" />
            )}
          />
          <Autocomplete
            aria-sort="ascending"
            disablePortal
            id="combo-box-demo"
            onChange={(e, value) => {
              if (value === null) {
                setSelectedDestination(null);
                setShowNavigationRoute(false);
              } else {
                setSelectedDestination(value);
                setShowNavigationRoute(true);
              }
            }}
            sx={{ width: 300 }}
            //options={cities} // Array of options
            options={citiesOptions.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.city} //  Used to determine the string value for a given option. This is needed because our options array is an array of objects. This will determine what value to display in the input.
            renderInput={(params) => (
              <TextField {...params} label="Place to go .." />
            )}
          />
          {/* <Button
            onClick={() => {
              setShowNavigationRoute(true);
              var dest = {
                city: "Linnakangas Sale",
                lat: "64.92342340148376",
                lon: "25.555962143685576",
              };

              setSelectedParkingSpace(dest);
            }}
          >
            Test
          </Button> */}
        </Stack>

        <MapContainer
          className="map"
          center={[65.013784817, 25.47209907]}
          zoom={14}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Oma sijainti */}
          <LocationMarker chooseCurrentLocation_={chooseCurrentLocation} />

          {/* {citiesLoaded && <Routing source={cities[0]} dest={cities[4]} />} */}
          {showNavigationRoute &&
            // Object is not empty
            Object.keys(selectedDestination).length !== 0 && (
              <Routing source={currentLocation} dest={selectedDestination} />
            )}
          {parkingSpaces
            .filter((v) => v.lat !== null)
            .filter((v) => v.lon !== null)
            .filter((v) => v.maxCapacity !== null)
            .map((row, index) => {
              return (
                <CircleMarker
                  key={row.carParkId}
                  center={[row.lat, row.lon]}
                  radius={12}
                  color={
                    row.spacesAvailable < ALMOST_FULL_PARKINGSPACE
                      ? "red"
                      : "green"
                  }
                  eventHandlers={{
                    click: () => onCircleMarkerClicked(row.carParkId),
                  }}
                >
                  {/* <PopupComponent row={row} /> */}
                  {row.carParkId === carParkId && (
                    <Modal
                      open={isOpen}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          {row.name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {row.spacesAvailable} paikkaa vapaana /{" "}
                          {row.maxCapacity} paikkaa yhteensä
                        </Typography>
                        {row.pricing !== null && <Divider />}
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {row.pricing?.map((item) => (
                            <ul>
                              <li>
                                {item.title.fi} {item.value.fi}
                              </li>
                            </ul>
                          ))}
                        </Typography>
                      </Box>
                    </Modal>
                  )}
                </CircleMarker>
              );
            })}
        </MapContainer>
      </div>
    </>
  );
};

export default ParkingSpaces;
