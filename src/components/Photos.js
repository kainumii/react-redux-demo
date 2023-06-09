import { ImageList, ImageListItem, Link } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Photos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function getPhotos() {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setPhotos(resp.data);
      console.log(resp.data);
    }

    getPhotos();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderedItem = photos.slice(0, 24).map((item) => {
    return (
      <ImageListItem key={item.id}>
        <img alt={item.title} src={`${item.thumbnailUrl}`} />
        <ImageListItemBar
          title={item.title}
          subtitle={item.author}
          actionIcon={
            <div>
              <InfoIcon color="success" fontSize="large" onClick={handleOpen} />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6">
                    {item.title}
                  </Typography>
                </Box>
              </Modal>
            </div>
          }
        />
      </ImageListItem>
    );
  });

  return (
    <div>
      <ImageList cols={8}>{renderedItem}</ImageList>;
    </div>
    // <div>
    //   <Button onClick={handleOpen}>Open modal</Button>
    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   >
    //     <Box sx={style}>
    //       <Typography id="modal-modal-title" variant="h6" component="h2">
    //         Text in a modal
    //       </Typography>
    //       <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //       </Typography>
    //     </Box>
    //   </Modal>
    // </div>
  );
};

export default Photos;
