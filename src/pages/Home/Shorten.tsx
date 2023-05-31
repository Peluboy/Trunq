import React from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { BsArrowRight } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";

const Shorten = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" pb={10}>
        <Box
          pt={8}
          px={4}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
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
          >
            <Box width="500px">
              <TextField
                name="name"
                type="text"
                variant="filled"
                fullWidth
                hiddenLabel
                size="medium"
              />
            </Box>
            <Box>
              <Button variant="contained" disableElevation size="large">
                Shorten URL
                <Box ml=".2rem" display="flex" alignItems="center">
                  <BsArrowRight />
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          bgcolor="#444E56;"
          p={2}
          width="660px"
          borderRadius={1}
          ml="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mr={4}
          mt={2}
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
