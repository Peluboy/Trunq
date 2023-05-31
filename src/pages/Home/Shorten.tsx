import React from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import { BsArrowRight } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";

const Shorten = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Box display="flex" flexDirection="column" pb={10}>
        <Box
          pt={8}
          px={4}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            gap: "1rem",
            pt: "3rem",
          }}
        >
          <Typography variant="h4" color="white">
            SHORTEN YOUR LINK NOW
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            justifyContent="flex-end"
            alignItems="center"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Box sx={{ width: { xs: "100%", sm: "500px" }, maxWidth: "500px" }}>
              <TextField
                name="name"
                type="text"
                variant="filled"
                fullWidth
                hiddenLabel
                size="medium"
              />
            </Box>
            <Box sx={{ width: { xs: "50%", sm: "auto" }, maxWidth: "500px" }}>
              <Button variant="contained" disableElevation size="large">
                {isMobile ? "Shorten" : "Shorten Url"}{" "}
                <Box ml=".2rem" display="flex" alignItems="center">
                  <BsArrowRight />
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          bgcolor="#444E56;"
          px={2}
          sx={{
            width: { xs: "83%", sm: "650px" },
            // maxWidth: "660px",
            borderRadius: 1,
            ml: "auto",
            mr: { xs: 4, sm: 4 },
            mt: 2,
            py: 1,
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Short Link</Typography>
          <Button size="small" variant="text">
            Copy
            <Box ml=".5rem" display="flex" alignItems="center">
              <IoCopyOutline color="#a1a1a1" cursor="pointer" />
            </Box>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Shorten;
