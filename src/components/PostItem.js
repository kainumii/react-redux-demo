import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PostAuthor from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { Link } from "react-router-dom";
import { TimeAgo } from "./TimeAgo";

const PostItem = ({ post_item }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#9DA2AB",
        m: "24px",
        border: 2,
        borderColor: "black",
      }}
    >
      <CardContent>
        <Typography variant="h6">{post_item.title}</Typography>
        <Typography variant="body">{post_item.body}</Typography>

        <PostAuthor userId={post_item.userId} />
        <TimeAgo timestamp={post_item.date} />

        <ReactionButtons post={post_item} />
        <Link to={`/posts/${post_item.id}`} className="button muted-button">
          View Post
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostItem;
