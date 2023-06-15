import "../../styles/home.css";
import {
  Typography,
  Box,
  Button,
  AvatarGroup,
  Avatar,
  Rating,
} from "@mui/material";
import TrunqHero from "../../assets/images/trunq-hero.svg";
import HeroFooter from "../../assets/images/hero-footer-banner.svg";
import { useState } from "react";
import AuthModal from "../../components/AuthModal";
import ShortenURLForm from "../../components/ShortenURLForm";
import StarIcon from "@mui/icons-material/Star";
import TomiImg from "../../assets/images/tomi.jpg";
import FataiImg from "../../assets/images/fatai.jpg";
import YomiImg from "../../assets/images/yomi.jpg";
import PeluImg from "../../assets/images/pelu.jpg";

const Hero = () => {
  const labels: { [index: string]: string } = {
    1: "1.0",
    2: "2.0",
    3: "3.0",
    4: "4.0",
    5: "5.0",
  };

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const value = 4;

  return (
    <div className="hero-container">
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box
        px={4}
        pt={6}
        display="flex"
        gap={4}
        flexDirection={{ xs: "column", sm: "row" }}
      >
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
              connect audiences worldwide, manage your links, track your links,
              create QR codes and also create brand relationships.
            </p>
          </Box>
          {/* <Box pt={5} display="flex" gap={2} sx={{ paddingBottom: "1rem" }}>
            <Button
              variant="contained"
              disableElevation
              size="large"
              onClick={() => setOpenAuthModal(true)}
            >
              Get Started for Free
            </Button>
            <Button variant="outlined" disableElevation>
              Get a Quote
            </Button>
          </Box> */}
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            pt={3}
            flexDirection="row"
            gap={2}
          >
            <AvatarGroup max={4}>
              <Avatar alt="Pelumi" src={PeluImg} />
              <Avatar alt="Tomi" src={TomiImg} />
              <Avatar alt="Yomi" src={YomiImg} />
              <Avatar alt="Fatai" src={FataiImg} />
            </AvatarGroup>
            <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row" alignItems="center">
                <Rating
                  name="read-only"
                  value={value}
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                  readOnly
                />
                <Typography
                  variant="h6"
                  fontWeight={600}
                  pt={0.8}
                  sx={{ ml: 1 }}
                  fontFamily="Stagnan, sans-serif"
                >
                  {labels[value]}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                fontFamily="Stagnan, sans-serif"
                pt={0.15}
                color="#bdbdbd"
              >
                from over 100+ reviews
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box width={{ xs: "100%", sm: "50%" }}>
          <ShortenURLForm />
        </Box>
      </Box>
      <img src={HeroFooter} alt="" />
    </div>
  );
};

export default Hero;
