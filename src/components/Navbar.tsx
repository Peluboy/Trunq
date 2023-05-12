import { AppBar, Toolbar, Button, Box } from "@mui/material";
import TrunqLogo from "../assets/images/trunqLogo.svg";
import "../styles/account.css";

const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img src={TrunqLogo} alt="" className="trunq-logo" />
          <Box ml="auto" display="flex">
            <Box mr="1rem">
              <Button color="inherit" variant="outlined">
                Source Code
              </Button>
            </Box>
            <Button color="inherit" variant="contained">
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
