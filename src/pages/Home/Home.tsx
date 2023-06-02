import Hero from "./Hero";
import { Typography, Box } from "@mui/material";
import Shorten from "./Shorten";
import HowItWorks from "./HowItWorks";
import Services from "./Services";

const Home = () => {
  return (
    <>
      <Box bgcolor="white">
        <Hero />
      </Box>
      <Box bgcolor="#3A414A" px={4} pb={5}>
        <Shorten />
        <HowItWorks />
      </Box>
      <Box bgcolor="white">
        <Services />
      </Box>
    </>
  );
};

export default Home;
