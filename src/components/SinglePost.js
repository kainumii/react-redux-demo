import {
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";
import { useNavigate } from "react-router-dom";

const SinglePost = ({ match }) => {
  // https://reactrouter.com/en/v6.3.0/getting-started/overview
  // --> Reading URL Parameters
  // --> Use :style syntax in your route path and useParams() to read them:
  // <Route exact path="/posts/:postId" element={<SinglePost />}></Route>

  // console.log({ match });
  // const { postId } = match.params;

  var params = useParams();

  const post = useSelector((state) =>
    state.postsRed.data.find((post) => post.id == params.postId)
  );

  let navigate = useNavigate();

  const onNavigateToMainClicked = () => {
    navigate("/");
  };

  if (post) {
    return (
      <>
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: "lightgray",
            border: 1,
            borderColor: "black",
            m: "24px",
          }}
        >
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body1">{post.body}</Typography>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
            <Link to={`/editPost/${post.id}`} className="button">
              Edit Post
            </Link>
          </CardContent>
        </Card>
        <ButtonGroup
          variant="text"
          sx={{ m: 2 }}
          aria-label="text button group"
        >
          <Button onClick={onNavigateToMainClicked} size="large">
            Navigate to main page
          </Button>
        </ButtonGroup>
      </>
    );
  } else {
    return <Typography sx={{ m: 3 }}>Post not found!!</Typography>;
  }
};

export default SinglePost;
