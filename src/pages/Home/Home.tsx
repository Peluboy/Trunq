import Hero from "./Hero";
import { Typography, Box } from "@mui/material";
import Shorten from "./Shorten";

const Home = () => {
  return (
    <>
      <Box bgcolor="white">
        <Hero />
      </Box>
      <Box bgcolor="#3A414A">
        <Shorten />
      </Box>
    </>
  );
};

export default Home;
