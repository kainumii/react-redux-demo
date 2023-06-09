import { LinearProgress, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textInput: {
    marginBottom: theme.spacing(4),
    // "& .MuiFormHelperText-root": {
    //   color: "red",
    // },
  },
}));

const CharacterCounter = (props) => {
  const classes = useStyles();

  const [input, setInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input.length >= props.maxCharacters) {
      setErrorMsg(`Limit for this field is ${props.maxCharacters} characters.`);
    } else {
      setErrorMsg("");
    }
  }, [input, props]);

  useEffect(() => {
    // The Math.round() function returns the value of a number rounded to the nearest integer.
    setProgress(Math.round((input.length * 100) / props.maxCharacters));
  }, [input]);

  return (
    <div>
      <Typography sx={{ m: 3 }}>
        Max Characters: {props.maxCharacters}
      </Typography>
      <TextField
        multiline
        rows={3}
        helperText={errorMsg}
        multiline={true}
        sx={{ m: 3, width: "50%" }}
        className={classes.textInput}
        inputProps={{ maxLength: props.maxCharacters }}
        onChange={handleInput}
      ></TextField>
      <Typography sx={{ m: 3 }}>
        {input.length} / {props.maxCharacters} characters - {progress} % used
      </Typography>
      <LinearProgress
        sx={{ m: 3, width: "50%" }}
        value={progress}
        variant="determinate"
      />
    </div>
  );
};

export default CharacterCounter;
