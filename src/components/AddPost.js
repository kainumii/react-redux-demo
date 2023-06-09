import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
//import { postAdded } from "../features/postsSlice";
import { addNewPost } from "../features/postsSlice";
import { Stack, TextField, Button, Select, MenuItem } from "@mui/material";
import { getUsers } from "../features/usersSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector((state) => state.users.value);

  const dispatch = useDispatch();

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const onSavePostClicked = () => {
    if (canSave) {
      // dispatch(postAdded({ id: nanoid(), title, body: content, userId }));

      dispatch(addNewPost({ title, body: content, userId }));
      setTitle("");
      setContent("");
      setUserId("");
    }
  };

  const handleAuthorChange = (event) => {
    setUserId(event.target.value);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <Stack spacing={2} padding="24px">
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          id="author"
          value={userId}
          label="Author"
          onChange={handleAuthorChange}
        >
          {users?.map((option) => {
            return (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>

        <TextField
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Stack>
      <Button
        sx={{ m: "24px" }}
        onClick={onSavePostClicked}
        variant="contained"
        disabled={!canSave}
      >
        Add post ..
      </Button>
    </>
  );
};
export default AddPostForm;
