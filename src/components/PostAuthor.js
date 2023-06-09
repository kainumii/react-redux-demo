import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const PostAuthor = (props) => {
  const users = useSelector((state) => state.users.value);

  const userId = props.userId;
  const a = users.find((user) => user.id == userId);

  return (
    <Typography variant="subtitle1">by {a ? a.name : "Unknown"}</Typography>
  );
};

export default PostAuthor;
