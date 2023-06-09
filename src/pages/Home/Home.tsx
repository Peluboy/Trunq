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
      <Box bgcolor="white" sx={{ overflowX: "hidden" }}>
        <Hero />
      </Box>
      <Box bgcolor="#3A414A" px={4} pb={5} sx={{ overflowX: "hidden" }}>
        <Shorten />
        <HowItWorks />
      </Box>
      <Box bgcolor="white" sx={{ overflowX: "hidden" }}>
        <Services />
      </Box>
      <Box bgcolor="#3A414A" sx={{ overflowX: "hidden" }}>
        <CallToAction />
      </Box>
      <Box bgcolor="white" px={4} sx={{ overflowX: "hidden" }}>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
