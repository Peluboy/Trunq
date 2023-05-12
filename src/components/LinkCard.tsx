import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const LinkCard = () => {
  return (
    <>
      <Box
        bgcolor="#fff"
        p="2rem"
        borderRadius="8px"
        boxShadow="rgba(0, 0, 0, 0.04) 0px 3px 5px;"
      >
        <Typography variant="h5" component="h2">
          Link Card
        </Typography>
        <Typography variant="body1" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </>
  );
};

export default LinkCard;
