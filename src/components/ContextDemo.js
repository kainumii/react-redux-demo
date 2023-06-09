import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import ChildA from "./ChildA";

export const Theme = React.createContext();

const ContextDemo = () => {
  const [theme, setTheme] = useState("Light");

  const toggleTheme = () => {
    setTheme(theme === "Light" ? "Dark" : "Light");
  };
  return (
    <>
      <Theme.Provider value={theme}>
        <ChildA />
        <Button sx={{ m: 3 }} variant="contained" onClick={toggleTheme}>
          Change Theme
        </Button>
      </Theme.Provider>
    </>
  );
};

export default ContextDemo;
