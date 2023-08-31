import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  Drawer,
  MenuItem,
  Avatar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TrunqLogo from "../assets/images/trunqLogo.svg";
import "../styles/account.css";
import { auth } from "../utils/Firebase";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";

const Navbar = ({ displayName }: { displayName: string | null }) => {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGmailUser, setIsGmailUser] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);

  // const handleLogout = () => {
  //   auth.signOut().then(() => {
  //     navigate("/home");
  //   });
  // };

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user) {
        setIsGmailUser(
          user.providerData.some(
            (provider) => provider.providerId === "google.com"
          )
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "2349038761241";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  // const handleSourceCode = () => {
  //   window.open("https://github.com/Peluboy/Trunq", "_blank");
  // };

  const user = auth.currentUser;

  // To extract the first and last initials of the user
  const initials = user
    ? user.displayName
        ?.split(" ")
        .map((name) => name[0])
        .join("")
    : "";

  return (
    <>
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
          <Link to="/">
            <img src={TrunqLogo} alt="" className="trunq-logo" />
          </Link>
          <Box ml="auto" display="flex">
            {isLoggedIn ? (
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center">
                  <IconButton
                    size="small"
                    color="secondary"
                    edge="end"
                    aria-label="toggle profile drawer"
                    onClick={() => setProfileDrawerOpen(!profileDrawerOpen)}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {isGmailUser && user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        initials
                      )}
                    </Avatar>

                    <Typography
                      variant="body2"
                      ml={1}
                      mr={2}
                      sx={{ display: { xs: "none", sm: "inline-flex" } }}
                    >
                      Hi, {user?.displayName}
                    </Typography>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={
                      isLoggedIn
                        ? () => setProfileDrawerOpen(!profileDrawerOpen)
                        : () => setOpenAuthModal(true)
                    }
                    sx={{ display: { sm: "none" } }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                {/* <Button
                  disableElevation
                  color="primary"
                  variant="outlined"
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  onClick={handleSourceCode}
                >
                  Source Code
                </Button> */}
                <Box>
                  <Button
                    disableElevation
                    color="primary"
                    variant="outlined"
                    onClick={handleWhatsAppClick}
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  >
                    Contact us
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box display="flex" gap={2}>
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
                <Button
                  disableElevation
                  color="primary"
                  variant="outlined"
                  onClick={handleWhatsAppClick}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  Contact us
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

            {/* drawer menu when user is signed out */}

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
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    disableElevation
                    color="primary"
                    variant="outlined"
                    onClick={handleWhatsAppClick}
                    fullWidth
                  >
                    Contact us
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
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* drawer menu when user is signed in */}

      {isLoggedIn && (
        <Drawer
          anchor="right"
          open={profileDrawerOpen}
          onClose={() => setProfileDrawerOpen(false)}
        >
          <Box width={300} p={3}>
            <UserProfile
              onDisplayNameUpdate={(displayName) => {
                /* Handle update */
              }}
            />
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
