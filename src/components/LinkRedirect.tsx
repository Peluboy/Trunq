import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  updateDoc,
  increment,
  where,
  query,
  getDocs,
  getDoc,
  doc,
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
          setTimeout(() => {
            window.location.href = longURL;
          }, 1000); // Delay the redirection by 500 milliseconds
        } else {
          setTimeout(() => {
            window.location.href = "http://" + longURL;
          }, 1000); // Delay the redirection by 500 milliseconds
        }

        setValidLink(true);
      }

      setLoading(false);
    };

    fetchLinkDoc();
  }, [shortCode]);

  // useEffect(() => {
  //   const handleRedirect = async () => {
  //     const linkCode = window.location.pathname.substring(1);
  //     const linkDocRef = doc(collection(firestore, "links"), linkCode);

  //     try {
  //       const linkDocSnapshot = await getDoc(linkDocRef);

  //       if (linkDocSnapshot.exists()) {
  //         const { longURL } = linkDocSnapshot.data() as { longURL: string };

  //         await updateDoc(linkDocRef, { totalClicks: increment(1) }); // Update the click count

  //         setTimeout(() => {
  //           window.location.href = longURL; // Redirect to the longURL
  //         }, 0);
  //       } else {
  //         // Handle invalid or non-existent shortcode
  //         console.log("Invalid shortcode or link does not exist");
  //       }
  //     } catch (error) {
  //       // Handle any errors that occur during the retrieval or redirection
  //       console.error("Error occurred during link redirection:", error);
  //     }
  //   };

  //   handleRedirect();
  // }, []);

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
        <Typography>Invalid link</Typography>
      </Box>
    );
  }

  return null; // Return null when loading is false and a valid link is found
};

export default LinkRedirect;
