import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Button,
  TextField,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { BsQrCodeScan } from "react-icons/bs";
import AuthModal from "./AuthModal";
import { AiOutlineLink } from "react-icons/ai";
import LockIcon from "@mui/icons-material/Lock";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ShortenURLForm = () => {
  const [value, setValue] = useState(0);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box borderRadius={3} boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px">
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box justifyContent="center" width="100%" pt={{ xs: "0", sm: "1rem" }}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={{ xs: "16px 16px 0 0px", sm: 0 }}
            ml={3}
            mr={3}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={
                  <Box display="flex" alignItems="center">
                    <Box mr=".5rem">
                      <AiOutlineLink size="22px" />
                    </Box>
                    Short Link
                  </Box>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Box display="flex" alignItems="center">
                    <Box mr=".5rem">
                      <BsQrCodeScan size="20px" />
                    </Box>
                    QR Code
                  </Box>
                }
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box
              sx={{
                display: "grid",
                gap: ".6rem",
                gridTemplateColumns: "1fr",
              }}
            >
              <Box display="flex" flexDirection="column">
                <Box pb={1}>
                  <Typography variant="h5" textTransform="none">
                    Shorten a Long link
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  textTransform="none"
                  fontWeight={500}
                  pb={0.7}
                >
                  Paste your Long URL
                </Typography>
                <TextField
                  name="longUrl"
                  size="medium"
                  type="text"
                  placeholder="https://webinar.online/example?:hgbe123pp"
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="h6"
                  textTransform="none"
                  fontWeight={500}
                  pb={0.7}
                >
                  Set your custom Domain & URL
                </Typography>

                <Box display="flex" alignItems="stretch" gap={0.5} pb={2}>
                  <Tooltip
                    title="Custom domain is unavailable"
                    arrow
                    placement="right"
                  >
                    <span>
                      <Button
                        variant="contained"
                        disabled
                        disableElevation
                        size="medium"
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6">trunq.xyz/</Typography>
                          <IconButton sx={{ marginRight: "-12px" }}>
                            <LockIcon fontSize="small" color="success" />
                          </IconButton>
                        </Box>
                      </Button>
                    </span>
                  </Tooltip>

                  <TextField
                    size="medium"
                    name="customUrl"
                    type="text"
                    placeholder="e.g kolohub (optional)"
                    sx={{
                      flex: 1,
                      borderRadius: "0 4px 4px 0 !important",
                    }}
                  />
                </Box>
                <Box
                  height="3rem"
                  bgcolor="#F4F7FF"
                  p={{ xs: ".5rem", sm: "1rem" }}
                  borderRadius={1.5}
                  display="flex"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    textTransform="none"
                    fontSize={{ xs: "11px", sm: "14px" }}
                    fontFamily="Stagnan, sans-serif"
                    color="#1463FF"
                  >
                    ✨ Make your link standout with unique words.
                  </Typography>
                </Box>
                <Box pt={{ xs: "1rem", sm: "1rem" }} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    disableElevation
                    size="large"
                    onClick={() => setOpenAuthModal(true)}
                  >
                    Sign up for a FREE link!
                  </Button>
                </Box>
              </Box>
            </Box>
          </TabPanel>

          {/* QR code Section */}

          <TabPanel value={value} index={1}>
            <Box width="100%">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgcolor="#fff"
                borderRadius="8px"
              >
                <Grid container spacing={matches ? 2 : 4}>
                  <Grid item xs={12}>
                    <Typography variant="h5" pb={1} textTransform="none">
                      Paste your Link
                    </Typography>
                    <Box display="flex" gap={0.5}>
                      <Box width="100%">
                        <TextField
                          fullWidth
                          size="medium"
                          name="longUrl"
                          type="text"
                          placeholder="https://webinar.online/example?:hgbe123pp"
                        />
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      pt={2}
                      fontFamily="Stagnan, sans-serif"
                      textTransform="none"
                    >
                      Create QR codes easily with our QR Code Generator. Just
                      paste your link, click 'Generate,' and get your QR code
                      instantly. Download it as a PNG image to use it anywhere
                      you want. Share your links effortlessly and connect with
                      your audience in a snap. Try our QR Code Generator now!
                    </Typography>
                    <Box pt={3} display="flex" gap={2}>
                      <Button
                        variant="contained"
                        disableElevation
                        size="large"
                        onClick={() => setOpenAuthModal(true)}
                      >
                        Sign up & get your QR code
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </TabPanel>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShortenURLForm;
