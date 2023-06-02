import React, { useEffect, useCallback, useState } from "react";
import "../styles/account.css";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Button,
  Snackbar,
  CircularProgress,
  useMediaQuery,
  Hidden,
} from "@mui/material";
import { BiHome } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import LinkCard from "./LinkCard";
import ShortenURLModal from "../components/ShortenURLModel";
import { firestore, auth } from "../utils/Firebase";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";
import {
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  collection,
  deleteDoc,
  query,
  limit,
} from "firebase/firestore";
import { isValid } from "date-fns";
import NoLinks from "../assets/images/no_links.svg";
import QrCodeCard from "./QrCodeCard";
import { useNavigate } from "react-router-dom";
// import { updateOGPTags } from "../openGraphUtils";

export interface LinkCardProps {
  id: string;
  createdAt: Date;
  name: string;
  longURL: string;
  shortCode: string;
  description: string;
  totalClicks: number;
  clickLocation?: string;
  // geolocation: string;
  deleteLink: (linkDocID: string) => Promise<void>;
  copyLink: (shortUrl: string) => void;
  customURL?: string;
}

export interface Link extends LinkCardProps {
  deleteLink: (linkDocID: string) => Promise<void>;
  copyLink: (shortUrl: string) => void;
}

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

const TopBar = ({
  updateStats,
}: {
  updateStats: (clicks: number, links: number) => void;
}) => {
  const [newLinkToaster, setNewLinkToaster] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(0);
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);
  const [customUrl, setCustomUrl] = useState("");

  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const handleCreateShortenLink = async (
    name: string,
    longURL: string,
    customURL: string
  ) => {
    const isValidURL = /^(ftp|http|https):\/\/[^ "]+$/.test(longURL);
    if (!isValidURL) {
      longURL = `http://${longURL}`;
    }

    const link = {
      name,
      longURL,
      shortCode: nanoid(6),
      createdAt: new Date(),
      totalClicks: 0,
      description: "",
      userID: auth.currentUser?.uid,
    };

    if (!customURL || customURL.trim() === "") {
      link.shortCode = nanoid(6);
    } else {
      link.shortCode = customURL;
    }

    const linksPathRef = collection(firestore, `users/${link.userID}/links`);
    const resp = await addDoc(linksPathRef, link);
    const linkID = resp.id;

    // Adding the link to the links collection
    const linksCollectionRef = collection(firestore, "links");
    const linkDocRef = doc(linksCollectionRef, link.shortCode);
    await setDoc(linkDocRef, {
      linkID: linkID,
      longURL: link.longURL,
      userID: link.userID,
    });

    const newLink: Link = {
      ...link,
      createdAt: link.createdAt,
      id: linkID,
      deleteLink: handleDeleteLink,
      copyLink: handleCopyLink,
      shortCode: link.shortCode,
    };

    setLinks((prevLinks) => [...prevLinks, newLink]);
    setOpenModal(false);

    setTotalClicks((prevTotalClicks) => prevTotalClicks + 1);
    setTotalLinks((prevTotalLinks) => prevTotalLinks + 1);
  };

  useEffect(() => {
    const userUid = auth.currentUser?.uid;
    const linksPathRef = collection(firestore, `users/${userUid}/links`);

    const fetchLinks = async () => {
      const linksQuery = query(linksPathRef, limit(20)); // Fetch only 20 documents
      // const querySnapshot = await getDocs(linksQuery);

      const querySnapshot = await getDocs(linksQuery);

      const tempLinks: Link[] = [];
      let clicks = 0;
      querySnapshot.forEach((doc) => {
        const {
          name,
          longURL,
          customURL,
          createdAt,
          totalClicks,
          shortCode,
        }: {
          name: string;
          longURL: string;
          customURL?: string;
          createdAt: { seconds: number; nanoseconds: number };
          totalClicks: number;
          shortCode: string;
        } = doc.data() as {
          name: string;
          longURL: string;
          customURL?: string;
          createdAt: { seconds: number; nanoseconds: number };
          totalClicks: number;
          shortCode: string;
        };
        const data: LinkCardProps & { customURL?: string } = {
          id: "",
          shortCode: shortCode || nanoid(6),
          description: "",
          name,
          longURL,
          createdAt: new Date(
            createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
          ),
          totalClicks,
          copyLink: handleCopyLink,
          deleteLink: handleDeleteLink,
          customURL: customURL || "",
        };

        tempLinks.push({
          ...data,
          id: doc.id,
          deleteLink: handleDeleteLink,
          copyLink: handleCopyLink,
        });
        clicks += data.totalClicks;
      });

      tempLinks.sort((prevLink, nextLink) =>
        prevLink.createdAt > nextLink.createdAt ? -1 : 1
      );

      setLinks(tempLinks);
      setTotalClicks(clicks);
      setTotalLinks(tempLinks.length);
      updateStats(clicks, tempLinks.length);

      setTimeout(() => setFetchingLinks(false), 1000);
    };

    fetchLinks();
  }, [auth.currentUser?.uid, links]);

  useEffect(() => {
    const handleRedirect = async () => {
      const linkCode = window.location.pathname.substr(1);
      const linkDocRef = doc(collection(firestore, "links"), linkCode);
      const linkDocSnapshot = await getDoc(linkDocRef);

      if (linkDocSnapshot.exists()) {
        const { longURL } = linkDocSnapshot.data() as { longURL: string };
        window.location.href = longURL;
      } else {
        // Handle invalid or non-existent shortcode
      }
    };

    handleRedirect();
  }, []);

  const handleDeleteLink = useCallback(async (linkDocID: string) => {
    const { currentUser } = auth;
    if (window.confirm("Are you sure you want to delete this link?")) {
      if (currentUser) {
        const userDocRef = doc(collection(firestore, "users"), currentUser.uid);
        const linkDocRef = doc(collection(userDocRef, "links"), linkDocID);
        const linkDocSnapshot = await getDoc(linkDocRef);

        if (linkDocSnapshot.exists()) {
          const { linkID, shortCode } = linkDocSnapshot.data() as {
            linkID?: string;
            shortCode?: string;
          };

          if (shortCode) {
            const linksCollectionRef = collection(firestore, "links");
            const rootLinkDocRef = doc(linksCollectionRef, shortCode);
            await deleteDoc(rootLinkDocRef);
          }
        }

        await deleteDoc(linkDocRef);
      }
      setLinks((oldLinks) => oldLinks.filter((link) => link.id !== linkDocID));
      setTotalLinks((prevTotalLinks) => prevTotalLinks - 1);
    }
  }, []);

  const handleCopyLink = useCallback((shortUrl: string) => {
    const completeUrl = `https://${shortUrl}`;
    copy(completeUrl);
    setNewLinkToaster(true);
  }, []);

  return (
    <>
      <Snackbar
        open={newLinkToaster}
        onClose={() => setNewLinkToaster(false)}
        autoHideDuration={2000}
        message="Link copied to the clipboard"
      />
      {openModal && (
        <ShortenURLModal
          createShortenLink={handleCreateShortenLink}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          customUrl={customUrl}
          setCustomUrl={setCustomUrl}
        />
      )}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={{ xs: "16px 16px 0 16px", sm: 0 }}
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
            <Hidden xsDown>
              <Button
                variant="contained"
                disableElevation
                onClick={() => setOpenModal(true)}
              >
                <Box display="flex" alignItems="center">
                  {isMobile ? "New" : "Create New"}{" "}
                  <Box ml=".5rem">
                    <AiOutlinePlus />
                  </Box>
                </Box>
              </Button>
            </Hidden>
          </Box>
          <TabPanel value={value} index={0}>
            <>
              {fetchingLinks ? (
                <Box textAlign="center" mb={2}>
                  <CircularProgress />
                </Box>
              ) : !links.length ? (
                <Box
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                >
                  <img src={NoLinks} alt="no_links" className="nolinks" />
                  <Typography variant="body2" ml={8} mb={2}>
                    You have no links
                  </Typography>
                </Box>
              ) : (
                links
                  .sort((prevLink, nextLink) => {
                    const prevTime = isValid(prevLink.createdAt)
                      ? prevLink.createdAt.getTime()
                      : 0;
                    const nextTime = isValid(nextLink.createdAt)
                      ? nextLink.createdAt.getTime()
                      : 0;
                    return nextTime - prevTime;
                  })
                  .map((link) => (
                    <LinkCard
                      key={link.id}
                      {...link}
                      deleteLink={handleDeleteLink}
                      copyLink={handleCopyLink}
                    />
                  ))
              )}
            </>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <QrCodeCard />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default TopBar;
