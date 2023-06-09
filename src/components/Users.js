import { Button, Typography } from "@mui/material";
import React from "react";
import { addUser, getUsers, deleteUser } from "../features/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Stack } from "@mui/system";
import { TextField } from "@mui/material";
import { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const addSingleUser = () => {
    dispatch(addUser({ name, username }));
  };

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#CCC",
          m: "24px",
          border: 2,
          borderColor: "black",
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} padding="24px">
            <TextField
              label="Name..."
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Username..."
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={addSingleUser} variant="contained">
              Lisää Käyttäjä
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <div>
        {users.map((item) => {
          return (
            // <div>
            //   <h3>{item.name}</h3>
            //   <p>{item.username}</p>
            //   <Button
            //     variant="contained"
            //     onClick={() => dispatch(deleteUser({ id: item.id }))}
            //   >
            //     Remove user
            //   </Button>
            // </div>

            <Card
              sx={{
                minWidth: 275,
                backgroundColor: "#CCC",
                border: 2,
                borderColor: "black",
                m: "24px",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  {item.name}
                </Typography>
                <Typography variant="h6" component="div">
                  {item.username}
                </Typography>
                <Typography variant="h6" component="div">
                  {item.email}
                </Typography>
                <Typography variant="h6" component="div">
                  {item.website}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => dispatch(deleteUser({ id: item.id }))}
                >
                  Delete user
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
