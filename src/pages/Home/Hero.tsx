import "../../styles/home.css";
import { Typography, Box, Button } from "@mui/material";
import TrunqHero from "../../assets/images/trunq-hero.svg";
import HeroFooter from "../../assets/images/hero-footer-banner.svg";
import { useState } from "react";
import AuthModal from "../../components/AuthModal";

const Hero = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <div className="hero-container">
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box px={4} pt={6} display="flex" flexDirection="column">
        <Box width={{ xs: "100%", sm: "50%" }}>
          <div className="header-top">
            <p>Let’s make simply one click 👈</p>
          </div>
          <Box pt={4}>
            <Typography
              variant="h2"
              pb={4}
              sx={{
                fontSize: { xs: "2.6rem", sm: "3.5rem" },
                "@media (min-width: 375px) and (max-width: 812px)": {
                  fontSize: "2.8rem",
                },
                "@media (min-width: 414px) and (max-width: 900px)": {
                  fontSize: "3rem",
                },
              }}
            >
              {" "}
              BIO LINK & LINK <br />
              SHORTENER <img src={TrunqHero} alt="" /> FOR
              {/* <br /> */} BUSINESS NEEDS
            </Typography>
            <p className="hero-paragraph">
              On a single platform, you’ll find all the tools you need to
              connect audiences worldwide, manage links and QR Code, and create
              brand relationships.
            </p>
          </Box>
          <Box pt={5} display="flex" gap={2} sx={{ paddingBottom: "1rem" }}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => setOpenAuthModal(true)}
            >
              Get Started for Free
            </Button>
            <Button variant="outlined" disableElevation>
              Get a Quote
            </Button>
          </Box>
        </Box>
        <Box width={{ xs: "100%", sm: "50%" }}>
          {/* Add content for the second box here */}
        </Box>
      </Box>
      <img src={HeroFooter} alt="" />
    </div>
  );
};

export default Hero;
