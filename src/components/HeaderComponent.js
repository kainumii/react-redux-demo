import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const HeaderComponent = (props) => {
  let navigate = useNavigate();
  // console.log("props: ", props);
  const { router } = props;
  // console.log(router);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageUrl) => {
    console.log(pageUrl);
    navigate(pageUrl);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageUrl) => {
    navigate(pageUrl);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Redux Essentials Demo
          </Typography>
          <div>
            <Button variant="contained" onClick={() => handleButtonClick("/")}>
              Blogs
            </Button>{" "}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/users")}
            >
              Users
            </Button>{" "}
            {/* <Button
              variant="contained"
              onClick={() => handleButtonClick("/yksittainen_item")}
            >
              Yksittainen
            </Button>{" "} */}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/twitter")}
            >
              Twitter
            </Button>{" "}
            {/* <Button
              variant="contained"
              onClick={() => handleButtonClick("/buttons")}
            >
              Buttons
            </Button>{" "}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/parent")}
            >
              Parent Demo
            </Button>{" "} */}
            {/* <Button
              variant="contained"
              onClick={() => handleButtonClick("/users")}
            >
              Users
            </Button>{" "} */}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/parkingspaces")}
            >
              Parking Spaces
            </Button>{" "}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/roadworks")}
            >
              Road Works
            </Button>{" "}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/mapboxdemo")}
            >
              Map Box
            </Button>{" "}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/photos")}
            >
              Photos
            </Button>{" "}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/contextdemo")}
            >
              UseContext
            </Button>{" "}
            <Button
              variant="contained"
              onClick={() => handleButtonClick("/charactercounter")}
            >
              Counter demo
            </Button>{" "}
            <IconButton
              edge="start"
              onClick={handleMenu}
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClick(null)}
            >
              <MenuItem onClick={() => handleMenuClick("/")}>Blogs</MenuItem>
              <MenuItem onClick={() => handleMenuClick("/users")}>
                Users
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/twitter")}>
                Twitter
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/parkingspaces")}>
                Parking spaces
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/roadworks")}>
                Road works
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/photos")}>
                Photos
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/contextdemo")}>
                UseContext
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComponent;
