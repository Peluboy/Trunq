import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  updateDoc,
  increment,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../utils/Firebase";
import { CircularProgress, Box, Typography } from "@mui/material";

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [validLink, setValidLink] = useState(false);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      const linksCollectionRef = collection(firestore, "links");
      const querySnapshot = await getDocs(
        query(linksCollectionRef, where("shortCode", "==", shortCode))
      );

      if (!querySnapshot.empty) {
        const linkDocSnapshot = querySnapshot.docs[0];
        const linkData = linkDocSnapshot.data();
        const longURL = linkData.longURL;
        console.log("Long URL:", longURL);
        await updateDoc(linkDocSnapshot.ref, { totalClicks: increment(1) });

        // Check if the longURL has a valid protocol
        const urlPattern = /^(?:\w+:)?\/\/(\S+)$/;

        if (urlPattern.test(longURL)) {
          window.location.href = longURL;
        } else {
          window.location.href = "http://" + longURL;
        }

        setValidLink(true);
      }

      setLoading(false);
    };

    fetchLinkDoc();
  }, [shortCode]);

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting to the link</Typography>
      </Box>
    );
  }

  if (!validLink) {
    return (
      <Box mt={10} textAlign="center">
        <Typography variant="h6">Invalid link</Typography>
      </Box>
    );
  }

  return null; // Return null when loading is false and a valid link is found
};

export default LinkRedirect;
