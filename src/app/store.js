import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import { combineReducers } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import usersReducer from "../features/usersSlice";

const reducer = combineReducers({
  postsRed: postsReducer,
  post: postReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer,
});

export default store;

// export default configureStore({
//   reducer: {
//     posts: postsReducer,
//   },
// });
