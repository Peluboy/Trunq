import Hero from "./Hero";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box bgcolor="white" sx={{ overflowX: "hidden" }}>
        <Hero />
      </Box>
    </>
  );
};

export default Home;
