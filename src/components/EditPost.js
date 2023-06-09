import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { postUpdated } from "../features/postsSlice";
import { SnackBar } from "./SnackBar";
import { SnackBarType } from "./SnackBar";

import {
  Button,
  Typography,
  Container,
  TextField,
  ButtonGroup,
  Grid,
} from "@mui/material";

export const EditPostForm = ({ match }) => {
  const CONTENT_MIN_LENGTH = 3;
  let navigate = useNavigate();
  let params = useParams();

  var id = params.postId;
  //const { postId } = match.params;

  const post = useSelector((state) =>
    state.postsRed.data.find((post) => post.id == id)
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [showCancelButton, setShowCancelButton] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [showNavigateToPostButtons, setShowNavigateToPostButtons] =
    useState(true);

  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  //   const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: id, title, content }));
      //   history.push(`/posts/${postId}`);
      setShowSnackBar(true);
      setShowSaveButton(false);
      setShowNavigateToPostButtons(true);
      setShowCancelButton(false);
      // navigate(`/posts/${id}`);
    }
  };

  const onCancelClicked = () => {
    navigate(`/posts/${id}`);
  };

  const onNavigateToPostClicked = () => {
    navigate(`/posts/${id}`);
  };

  useEffect(() => {
    if (content.length <= CONTENT_MIN_LENGTH) {
      setErrorMsg(
        "Content is too short!! It has to be minimum " +
          (CONTENT_MIN_LENGTH + 1) +
          " characters long!"
      );
    }
  }, [content]);

  useEffect(() => {
    if (content.length > CONTENT_MIN_LENGTH && errorMsg) {
      setErrorMsg("");
    }
  }, [content, errorMsg]);

  useEffect(() => {
    if (errorMsg.length > 0) {
      setShowSaveButton(false);
    } else {
      setShowSaveButton(true);
    }
  }, [errorMsg]);

  return (
    <>
      <SnackBar
        open={showSnackBar}
        message={"Post saved successfully!"}
        severity={SnackBarType.SUCCESS}
        handleClose={() => {
          setShowSnackBar(false);
        }}
      />

      <TextField
        value={title}
        helperText="Title"
        onChange={onTitleChanged}
        sx={{
          m: 3,
          width: "95%",
        }}
      ></TextField>

      <TextField
        error={content.length <= CONTENT_MIN_LENGTH}
        helperText={errorMsg}
        multiline={true}
        value={content}
        onChange={onContentChanged}
        sx={{ margin: 3, width: "95%" }}
      ></TextField>

      <ButtonGroup
        variant="outlined"
        sx={{ m: 3 }}
        aria-label="outlined button group"
      >
        {showSaveButton && (
          <Button onClick={onSavePostClicked} size="large">
            Save Post
          </Button>
        )}
        {showCancelButton && (
          <Button onClick={onCancelClicked} size="large">
            Cancel
          </Button>
        )}

        {showNavigateToPostButtons && (
          <Button onClick={onNavigateToPostClicked} size="large">
            Navigate to post {id}
          </Button>
        )}
      </ButtonGroup>
    </>
  );
};
