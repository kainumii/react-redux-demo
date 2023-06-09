import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import { Typography } from "@mui/material";

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <Typography variant="body1">
      <i>{timeAgo}</i>
    </Typography>
  );
};
