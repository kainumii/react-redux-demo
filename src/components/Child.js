import { Button, Typography } from "@mui/material";
import React from "react";

const Child = (props) => {
  console.log("Child component props: ", props);
  return (
    <div>
      <Typography>Child component</Typography>
      <Button variant="contained" onClick={() => props.changeText("Moi")}>
        Hit me
      </Button>
    </div>
  );
};

export default Child;
