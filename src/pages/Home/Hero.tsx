import "../../styles/home.css";
import { Typography, Box, Button } from "@mui/material";
import TrunqHero from "../../assets/images/trunq-hero.svg";
import HeroFooter from "../../assets/images/hero-footer-banner.svg";

const Hero = () => {
  return (
    <div className="hero-container">
      <Box px={4} pt={6} display="flex" flexDirection="column">
        <Box width="50%">
          <div className="header-top">
            <p>Let’s make simply one click 👈</p>
          </div>
          <Box pt={4}>
            <Typography variant="h2" pb={4}>
              {" "}
              BIO LINK & LINK <br />
              SHORTENER <img src={TrunqHero} alt="" /> FOR
              <br />
              BUSINESS NEEDS
            </Typography>
            <p className="hero-paragraph">
              On a single platform, you’ll find all the tools you need to
              connect audiences worldwide, manage links and QR Code, and create
              brand relationships.
            </p>
          </Box>
          <Box pt={5} display="flex" gap={2}>
            <Button variant="contained" disableElevation>
              Get Started for Free
            </Button>
            <Button variant="outlined" disableElevation>
              Get a Quote
            </Button>
          </Box>
        </Box>
        <Box width="50%"></Box>
      </Box>
      <img src={HeroFooter} alt="" />
    </div>
  );
};

export default Hero;
