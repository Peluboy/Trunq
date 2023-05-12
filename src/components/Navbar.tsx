import { AppBar, Toolbar, Button, Box } from "@mui/material";
import TrunqLogo from "../assets/images/trunqLogo.svg";
import "../styles/account.css";

const Navbar = () => {
  return (
    <>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
          <img src={TrunqLogo} alt="" className="trunq-logo" />
          <Box ml="auto" display="flex">
            <Box mr="1rem">
              <Button disableElevation color="primary" variant="outlined">
                Source Code
              </Button>
            </Box>
            <Button disableElevation color="primary" variant="contained">
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
