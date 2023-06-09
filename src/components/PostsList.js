import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postsSlice";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";
const Cards = ({ data_ }) => {
  return (
    <div>
      <h3>{data_.title}</h3>
      <p>{data_.body}</p>
      <hr />
    </div>
  );
};

function PostsList() {
  const dispatch = useDispatch();
  //   const { data, loading, error } = useSelector((state) => state.posts);

  const data_ = useSelector((state) => state.postsRed.data);
  const status_ = useSelector((state) => state.postsRed.status);
  const error_ = useSelector((state) => state.postsRed.error);

  useEffect(() => {
    if (status_ === "idle") {
      dispatch(fetchPosts());
    }
  }, []);

  if (status_ === "succeeded") {
    const ordered = data_.slice().sort((a, b) => b.date.localeCompare(a.date));

    return ordered.map((item) => {
      return (
        <div>
          <PostItem key={item.id} post_item={item} />
          {/* <Link to={`/posts/${item.id}`} className="button muted-button">
            View Post
          </Link> */}
        </div>
      );
    });
  }

  if (status_ === "loading") {
    return <CircularProgress />;
  }

  if (status_ === "failed") {
    return <div>{error_}</div>;
  }
}

export default PostsList;
