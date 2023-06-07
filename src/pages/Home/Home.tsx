import Hero from "./Hero";
import { Typography, Box } from "@mui/material";
import Shorten from "./Shorten";
import HowItWorks from "./HowItWorks";
import Services from "./Services";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

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
      <Box bgcolor="#3A414A">
        <CallToAction />
      </Box>
      <Box bgcolor="white" px={4}>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
