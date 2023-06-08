import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import CTObg from "../../assets/images/get-closer-bg.svg";
import AuthModal from "../../components/AuthModal";

const CallToAction = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <>
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundImage: `url(${CTObg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box py={10} px={4} display="flex" flexDirection="column" gap={1.5}>
          <div className="CTO-top">
            <p>🔥 Growth Hack your way to the Top!</p>
          </div>
          <Typography
            variant="h4"
            color="white"
            width={{ xs: "100%", sm: "80%" }}
            pb={3}
          >
            GET CLOSER TO YOUR CUSTOMERS TODAY
          </Typography>
          <Box>
            <Button
              variant="contained"
              disableElevation
              onClick={() => setOpenAuthModal(true)}
            >
              Get Started for Free
            </Button>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </>
  );
};

export default CallToAction;
