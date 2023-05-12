import React from "react";

import { useState } from "react";
import "../styles/account.css";
import { Box, Tabs, Tab, Typography, Grid, Button } from "@mui/material";
import { BiHome } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import LinkCard from "./LinkCard";

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

const TopBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            display="flex"
            justifyContent="space-between"
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
                      <BiHome size="18px" />
                    </Box>
                    Home
                  </Box>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Box display="flex" alignItems="center">
                    <Box mr=".5rem">
                      <BsQrCodeScan size="18px" />
                    </Box>
                    Generate QR Code
                  </Box>
                }
                {...a11yProps(1)}
              />
            </Tabs>
            <button className="custom-button">
              <Box display="flex" alignItems="center">
                Create New{" "}
                <Box ml=".5rem">
                  <AiOutlinePlus />
                </Box>
              </Box>
            </button>
          </Box>
          <TabPanel value={value} index={0}>
            <LinkCard />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Generate QR Code
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default TopBar;
