import React from "react";
import { Typography, Box, Button, TextField, Grid } from "@mui/material";
import FooterImg from "../../assets/images/footer-logo.svg";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <Grid container justifyContent="space-between" py={8} gap={4}>
        <Grid item xs={12} sm={7}>
          <Box display="flex" flexDirection="column" gap={2}>
            <img src={FooterImg} alt="" className="footer-img" />
            <Typography width={{ xs: "100%", sm: "50%" }} fontSize="14px">
              On a single platform, you’ll find all the tools you need to
              connect audiences worldwide, manage links and QR Code, and create
              brand relationships.
            </Typography>
            <Box display="flex" flexDirection="row" gap={1}>
              <Link to="/">Home</Link>
              <Link to="/">Pricing</Link>
              <Link to="/">Login</Link>
              <Link to="/">Contact</Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography fontSize="14px" fontWeight="bold" color="#010101">
              SUBSCRIBE TO NEWSLETTER
            </Typography>
            <Typography width="100%" fontSize="14px" pb={2}>
              On a single platform, you’ll find all the tools you need to
              connect audiences worldwide & manage links and QR Code.
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              justifyContent="flex-end"
              alignItems="center"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Box
                sx={{ width: { xs: "100%", sm: "300px" }, maxWidth: "300px" }}
              >
                <TextField
                  name="subscribe"
                  type="text"
                  variant="filled"
                  fullWidth
                  size="small"
                  hiddenLabel
                  placeholder="your@email.com"
                />
              </Box>
              <Box sx={{ width: { xs: "50%", sm: "auto" }, maxWidth: "500px" }}>
                <Button variant="contained" disableElevation>
                  Subscribe
                  <Box ml=".2rem" display="flex" alignItems="center">
                    <BsArrowRight />
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
