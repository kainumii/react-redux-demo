import {
  Button,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { orange } from "@mui/material/colors";

const Buttons = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#CCC",
      },
      secondary: { main: "#FAC" },
    },
    typography: {
      myVariant: {
        fontSize: "5rem",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="myVariant">Moi Material UI</Typography>
        <Button
          color="secondary"
          variant="contained"
          sx={{ width: "300px", border: 5, borderColor: "primary.main" }}
        >
          Hit me
        </Button>{" "}
        <Button color="primary" variant="contained">
          Hit me too!
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default Buttons;
