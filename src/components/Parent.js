import { Typography } from "@mui/material";
import React from "react";
import Child from "./Child";
import { useState } from "react";

const Parent = () => {
  const [text, setText] = useState("Parent");
  return (
    <div>
      <Typography>{text}</Typography>
      <Child changeText={(a) => setText(a)} />
    </div>
  );
};

export default Parent;
