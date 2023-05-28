import { AppBar, Toolbar, Button, Box } from "@mui/material";
import TrunqLogo from "../assets/images/trunqLogo.svg";
import "../styles/account.css";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/home");
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
          <img src={TrunqLogo} alt="" className="trunq-logo" />
          <Box ml="auto" display="flex">
            {isLoggedIn ? (
              <>
                <Box mr="1rem">
                  <Button disableElevation color="primary" variant="outlined">
                    Source Code
                  </Button>
                </Box>
                <Button
                  disableElevation
                  color="primary"
                  variant="contained"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Box mr="1rem">
                  <Button
                    disableElevation
                    color="primary"
                    variant="outlined"
                    onClick={() => navigate("/signup")}
                  >
                    Pricing plan
                  </Button>
                </Box>
                <Button
                  disableElevation
                  color="primary"
                  variant="contained"
                  onClick={() => setOpenAuthModal(true)}
                >
                  Get Started
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
