import { Snackbar, Alert } from "@mui/material";
import React from "react";

export const SnackBarType = {
  SUCCESS: "success",
  ERROR: "error",
};

export const SnackBar = (props) => {
  return (
    <Snackbar
      open={props.open}
      severity={props.severity}
      autoHideDuration={3000}
      onClose={props.handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={props.severity} sx={{ width: "100%" }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};
