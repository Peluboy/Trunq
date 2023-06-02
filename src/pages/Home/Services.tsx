import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { BiBarChartSquare } from "react-icons/bi";
import { BiServer } from "react-icons/bi";
import LogoLarge from "../../assets/images/logo-large.svg";

const Services = () => {
  return (
    <Box
      py={8}
      px={4}
      sx={{
        py: 6,
      }}
    >
      <Box
        pb={6}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          gap: "1.5rem",
        }}
      >
        <Typography variant="h4" color="#1D2A36">
          WHY USE OUR SERVICE
        </Typography>

        <Box sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: "400px" }}>
          <p className="how-it-works-paragraph">
            On a single platform, you’ll find all the tools you need to connect
            audiences worldwide, manage links and QR Code, and create brand
            relationships.
          </p>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: "2rem", sm: "2rem" }}
        p={2}
        width={{ xs: "340px", sm: "auto" }}
      >
        <Box width={{ xs: "100%", sm: "65%" }}>
          <Grid container spacing={2} rowGap={2} columnGap={2}>
            <Grid
              item
              xs={12}
              sm={5.8}
              bgcolor=" #F6F6F6"
              borderRadius={2}
              p={3}
              height="100px"
              display="flex"
              alignItems="center"
            >
              <Box
                alignItems="flex-start"
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5">100k</Typography>
                  <Typography variant="body2">Active Users</Typography>
                </Box>
                <Box
                  height="30px"
                  width="30px"
                  borderRadius="50%"
                  bgcolor="#1463FF"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <AiOutlineUsergroupAdd color="white" />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5.8}
              bgcolor=" #F6F6F6"
              borderRadius={2}
              p={3}
              height="100px"
              display="flex"
              alignItems="center"
            >
              <Box
                alignItems="flex-start"
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5">50k</Typography>
                  <Typography variant="body2">Links Created</Typography>
                </Box>
                <Box
                  height="30px"
                  width="30px"
                  borderRadius="50%"
                  bgcolor="#1463FF"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <AiOutlineLink color="white" />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5.8}
              bgcolor=" #F6F6F6"
              borderRadius={2}
              p={3}
              height="100px"
              display="flex"
              alignItems="center"
            >
              <Box
                alignItems="flex-start"
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5">500+</Typography>
                  <Typography variant="body2">Integrations</Typography>
                </Box>
                <Box
                  height="30px"
                  width="30px"
                  borderRadius="50%"
                  bgcolor="#1463FF"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <BiBarChartSquare color="white" />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5.8}
              bgcolor=" #F6F6F6"
              borderRadius={2}
              p={3}
              height="100px"
              display="flex"
              alignItems="center"
            >
              <Box
                alignItems="flex-start"
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5">99%</Typography>
                  <Typography variant="body2">Uptime Server</Typography>
                </Box>
                <Box
                  height="30px"
                  width="30px"
                  borderRadius="50%"
                  bgcolor="#1463FF"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <BiServer color="white" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          bgcolor="#1463FF"
          p={4}
          mt={-1.5}
          width={{ xs: "325px", sm: "35%" }}
          height={{ xs: "180px", sm: "auto" }}
          borderRadius={2}
          position="relative"
          sx={{ ml: "-1rem" }}
        >
          <img src={LogoLarge} alt="" className="ssl-image" />
          <p className="ssl-paragraph">
            SSL and redirection <br />
            url with no worries
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Services;
