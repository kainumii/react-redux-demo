import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  // action type string

  // argument of 'posts/getPosts' generates actiob types
  // 1. pending: 'posts/getPosts/pending'
  // 2. fulfilled: 'posts/getPosts/fulfilled'
  // 3. rejected: 'posts/getPosts/rejected'
  "users/getUsers",
  // callback function
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

export const addUser = createAsyncThunk("users/addUser", async (data) => {
  console.log(data.name);
  const resp = await axios.post("https://jsonplaceholder.typicode.com/users", {
    name: data.name,
    username: data.username,
  });

  console.log(resp.data);
  return resp.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (data) => {
  console.log("delete: ", data.id);
  const resp = await axios.delete(
    `https://jsonplaceholder.typicode.com/users/${data.id}`
  );

  console.log(resp.data);
  return resp.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState: { value: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      console.log("state.value: ", state.value);
      console.log("action.payload: ", action.payload);
      state.value.push(action.payload);
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    });
  },
});

export default userSlice.reducer;
