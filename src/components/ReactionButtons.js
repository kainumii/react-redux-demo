import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../features/postsSlice";
import { Button } from "@mui/material";

const reactionEmoji = {
  thumbsUp: "👍",
  heart: "❤️",
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([key, value]) => {
    return (
      // <button
      //   key={key}
      //   type="button"
      //   onClick={() =>
      //     dispatch(reactionAdded({ postId: post.id, reaction: key }))
      //   }
      // >
      //   {value}: {post.reactions[key]}
      // </button>

      <Button
        key={key}
        sx={{ m: 1 }}
        variant="contained"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: key }))
        }
      >
        {value} : {post.reactions[key]}
      </Button>
    );
  });

  return <div>{reactionButtons}</div>;
};
