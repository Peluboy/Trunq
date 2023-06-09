import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box
      height="85vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          position="relative"
          alignItems="center"
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "100px", sm: "220px" } }}
          >
            OOPS!
          </Typography>
          <Box
            bgcolor="#f4faff"
            p={{ xs: 1, sm: 2.5 }}
            position="absolute"
            top={{ xs: "4rem", sm: "9rem" }}
          >
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: "14px", sm: "28px" } }}
            >
              404 - The Page can't be found
            </Typography>
          </Box>
        </Box>
        <Box>
          <Link to="/">
            <Button variant="contained" disableElevation>
              Homepage
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;
