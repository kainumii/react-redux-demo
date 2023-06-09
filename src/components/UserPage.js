import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { Divider, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const UserPage = () => {
  let params = useParams();
  var user_id = params.userId;

  // nykyinen käyttäjä
  const user = useSelector((state) =>
    state.users.value.find((user) => user.id == user_id)
  );

  // kaikki blogit
  const allPosts = useSelector((state) => state.postsRed.data);
  console.log(allPosts);

  // kyseisen käyttäjän blogit
  const postsForUser = allPosts.filter((post) => post.userId == user_id);
  console.log(postsForUser);

  // mäppää blogit listanäkymään
  const postTitles = postsForUser.map((post) => (
    <ListItem key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </ListItem>
  ));
  return (
    <>
      <Typography sx={{ m: 2 }} variant="h5">
        All blogs by {user.name}
      </Typography>
      <Divider light />
      <List>{postTitles}</List>
    </>
  );
};
export default UserPage;
