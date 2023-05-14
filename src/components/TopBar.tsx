import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/account.css";
import { Box, Tabs, Tab, Typography, Grid, Button } from "@mui/material";
import { BiHome } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import LinkCard from "./LinkCard";
import ShortenURLModal from "./ShortenURLModel";
import { firestore, auth } from "../utils/Firebase";
import { nanoid } from "nanoid";
// import { FieldValue } from "firebase/firestore";
import {
  getDocs,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export interface LinkCardProps {
  id: string;
  createdAt: {
    toDate(): Date;
  };
  name: string;
  longURL: string;
  shortCode: string;
  totalClicks: number;
}
interface Link {
  id: string;
  name: string;
  longURL: string;
  customURL: string;
  createdAt: {
    toDate(): Date;
  };
  shortCode: string;
  totalClicks: number;
}

const dummyData = [
  {
    id: "03f5gy55k",
    createdAt: new Date(),
    name: "My website",
    longURL: "https://example.com/longURL/998gthds?./:hn",
    shortCode: "trunq",
    totalClicks: 100,
  },

  {
    id: "0hg5gt67k",
    createdAt: new Date(),
    name: "Another website",
    longURL: "https://example.com/longURL/92bgthds?n",
    shortCode: "hg456",
    totalClicks: 63,
  },
];
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
  const [links, setLinks] = useState<Link[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCreateShortenLink = async (
    name: string,
    longURL: string,
    customURL: string
  ) => {
    const link = {
      name,
      longURL,
      customURL,
      createdAt: serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };
    const { currentUser } = auth;
    if (currentUser) {
      const userDocRef = doc(collection(firestore, "links"), currentUser.uid);
      const linksCollectionRef = collection(userDocRef, "links");
      const resp = await addDoc(linksCollectionRef, link);
    }

    setOpenModal(false);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const { currentUser } = auth;
      if (currentUser) {
        const userDocRef = doc(collection(firestore, "links"), currentUser.uid);
        const linksCollectionRef = collection(userDocRef, "links");
        const snapshot = await getDocs(linksCollectionRef);

        const tempLinks: Link[] = [];
        snapshot.forEach((doc) =>
          tempLinks.push({
            ...doc.data(),
            id: doc.id,
            // createdAt: doc.data().createdAt.toDate(),
          } as Link)
        );
        setLinks(tempLinks);
      }
    };
    fetchLinks();
  }, []);

  return (
    <>
      {openModal && (
        <ShortenURLModal
          createShortenLink={handleCreateShortenLink}
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
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
            <Button
              variant="contained"
              disableElevation
              onClick={() => setOpenModal(true)}
            >
              <Box display="flex" alignItems="center">
                Create New{" "}
                <Box ml=".5rem">
                  <AiOutlinePlus />
                </Box>
              </Box>
            </Button>
          </Box>
          <TabPanel value={value} index={0}>
            <>
              {links.map((link) => (
                <LinkCard key={link.id} {...link} />
              ))}
            </>
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
