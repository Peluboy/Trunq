import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const LinkExpired = () => (
  <Box minHeight="80vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
    <Typography variant="h3" color="error" gutterBottom>
      Link Expired
    </Typography>
    <Typography variant="body1" color="textSecondary" gutterBottom>
      Sorry, this link is no longer available. It may have expired or been deleted.
    </Typography>
    <Button variant="contained" color="primary" component={Link} to="/">
      Go to Home
    </Button>
  </Box>
);

export default LinkExpired; 