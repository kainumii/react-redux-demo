import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

// Create the thunk
export const fetchPosts = createAsyncThunk(
  // action type string

  // argument of 'posts/getPosts' generates actiob types
  // 1. pending: 'posts/getPosts/pending'
  // 2. fulfilled: 'posts/getPosts/fulfilled'
  // 3. rejected: 'posts/getPosts/rejected'
  "posts/fetchPosts",
  // callback function
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addnewpost",
  async (initial_post) => {
    console.log("initial_post: ", initial_post);
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      initial_post
    );

    console.log("wqwewqe: ", res.data);
    return res.data;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    // singlePost: {},
    // isLoading: false,
  },
  reducers: {
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.data.find((post) => post.id == id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.data.find((post) => post.id == postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  // reducers: {
  //   postAdded(state, action) {
  //     state.data.push(action.payload);
  //   },
  // },
  extraReducers: (builder) => {
    // builder.addCase(getPost.fulfilled, (state, action) => {
    //   state.singlePost = action.payload;
    //   state.isLoading = false;
    // });
    // builder.addCase(getPost.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getPost.rejected, (state, action) => {
    //   state.isLoading = false;
    // });

    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";

      // Just to add the date and reactions ..
      let hour = 1;
      const posts = action.payload.map((post) => {
        post.date = sub(new Date(), { hours: hour++ }).toISOString();
        post.reactions = { thumbsUp: 0, heart: 0 };
        return post;
      });

      state.data = state.data.concat(posts);
      // state.data = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.date = new Date().toISOString();
      action.payload.reactions = { thumbsUp: 0, heart: 0 };
      state.data.push(action.payload);
    });
  },
});

//export const { postAdded } = postsSlice.actions;
export const { postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
