import { Typography } from "@material-ui/core";
import React from "react";
import { Popup } from "react-leaflet";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PopupComponent = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Popup>
      <Typography variant="h6">{props.row.name}</Typography>{" "}
      <Typography variant="body1">
        {props.row.spacesAvailable} paikkaa vapaana / {props.row.maxCapacity}{" "}
        paikkaa yhteensä
      </Typography>
    </Popup>
  );
};

export default PopupComponent;
