import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSinglePostById = createAsyncThunk(
  "posts/getPost",
  async (data) => {
    const id = data.id;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return res.data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    data: {},
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSinglePostById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSinglePostById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSinglePostById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "error";
    });
  },
});

export default postSlice.reducer;
