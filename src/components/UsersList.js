import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../features/usersSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider, Typography } from "@mui/material";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.users.value);
  console.log(users);

  return (
    <>
      <Typography sx={{ m: 2 }} variant="h5">
        All Writers
      </Typography>
      <Divider light />
      <List>
        {users.map((user) => {
          return (
            <ListItem>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
export default UsersList;
