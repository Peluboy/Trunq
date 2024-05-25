import React from "react";
import { Box, Tabs, Tab, Button, Hidden } from "@mui/material";
import { BiHome } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

interface TabsComponentProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  handleOpenModal: () => void;
  isMobile: boolean;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  value,
  handleChange,
  handleOpenModal,
  isMobile,
}) => {
  return (
    <Box
      sx={{ borderBottom: 1, borderColor: "divider" }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={{ xs: "16px 16px 0 16px", sm: 0 }}
    >
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
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
      <Hidden xsDown>
        <Button variant="contained" disableElevation onClick={handleOpenModal}>
          <Box display="flex" alignItems="center">
            {isMobile ? "New" : "Create New"}{" "}
            <Box ml=".5rem">
              <AiOutlinePlus />
            </Box>
          </Box>
        </Button>
      </Hidden>
    </Box>
  );
};

export default TabsComponent;
