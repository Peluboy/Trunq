import React, { useState } from "react";
import { Box, Grid, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinkCard from "./LinkCard";
import QrCodeCard from "./QrCodeCard";
import ShortenURLModal from "../components/ShortenURLModel";
import { useLinks } from "../hooks/useLinks";
import NoLinks from "../assets/images/no_links.svg";
import { firestore, auth } from "../utils/Firebase";
import { nanoid } from "nanoid";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import TabPanel from "./TabPanel";
import TabsComponent from "./TabsComponent";
import { LinkCardProps } from "../types/types";

const TopBar: React.FC<{ updateStats: (clicks: number, links: number) => void }> = ({ updateStats }) => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(0);
  const [customUrl, setCustomUrl] = useState("");

  const { links, fetchingLinks, totalClicks, handleDeleteLink, handleCopyLink, setLinks } = useLinks(updateStats);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCreateShortenLink = async (name: string, longURL: string, customURL: string) => {
    const isValidURL = /^(ftp|http|https):\/\/[^ "]+$/.test(longURL);
    if (!isValidURL) {
      longURL = `http://${longURL}`;
    }

    const link = {
      name,
      longURL,
      shortCode: customURL.trim() ? customURL : nanoid(6),
      createdAt: new Date(),
      totalClicks: 0,
      description: "",
      clickLocation: [],
      userID: auth.currentUser?.uid,
    };

    const linksPathRef = collection(firestore, `users/${link.userID}/links`);
    const resp = await addDoc(linksPathRef, link);
    const linkID = resp.id;

    const linksCollectionRef = collection(firestore, "links");
    const linkDocRef = doc(linksCollectionRef, link.shortCode);
    await setDoc(linkDocRef, {
      linkID,
      longURL: link.longURL,
      userID: link.userID,
      shortCode: link.shortCode,
    });

    const newLink: LinkCardProps = {
      ...link,
      id: linkID,
      deleteLink: handleDeleteLink,
      copyLink: handleCopyLink,
    };

    setLinks((prevLinks: LinkCardProps[]) => {
      const updatedLinks = [...prevLinks, newLink];
      updateStats(totalClicks, updatedLinks.length);
      return updatedLinks;
    });

    setOpenModal(false);
  };

  return (
    <>
      <ToastContainer position="bottom-center" />
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
          <TabsComponent
            value={value}
            handleChange={handleChange}
            handleOpenModal={() => setOpenModal(true)}
            isMobile={isMobile}
          />
          <TabPanel value={value} index={0}>
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
              links.map((link: LinkCardProps) => (
                <LinkCard
                  key={link.id}
                  {...link}
                  deleteLink={handleDeleteLink}
                  totalClicks={totalClicks}
                  copyLink={handleCopyLink}
                />
              ))
            )}
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
