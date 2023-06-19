import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TrunqLogo from "../assets/images/trunqLogo.svg";
import "../styles/account.css";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/home");
    });
  };

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <Link to="/">
            <img src={TrunqLogo} alt="" className="trunq-logo" />
          </Link>
          <Box ml="auto" display="flex">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {isLoggedIn ? (
              <Box display="flex" gap={2}>
                <Button
                  disableElevation
                  color="primary"
                  variant="outlined"
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  Source Code
                </Button>
                <Button
                  disableElevation
                  color="primary"
                  variant="contained"
                  onClick={handleLogout}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  Log Out
                </Button>
              </Box>
            ) : (
              <Box display="flex" gap={2}>
                <Button
                  disableElevation
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate("/signup")}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  Pricing Plan
                </Button>
                <Button
                  disableElevation
                  color="primary"
                  variant="contained"
                  onClick={() => setOpenAuthModal(true)}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  Login / Sign up
                </Button>
              </Box>
            )}
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {isLoggedIn ? (
                <>
                  <MenuItem onClick={handleMenuClose}>
                    <Button
                      disableElevation
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Source Code
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Button
                      disableElevation
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                      Log Out
                    </Button>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleMenuClose}>
                    <Button
                      disableElevation
                      color="primary"
                      variant="outlined"
                      onClick={() => navigate("/signup")}
                      fullWidth
                    >
                      Pricing Plan
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Button
                      disableElevation
                      color="primary"
                      variant="contained"
                      onClick={() => setOpenAuthModal(true)}
                      fullWidth
                    >
                      Login / Sign up
                    </Button>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
