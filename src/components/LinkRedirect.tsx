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
import { auth, firestore } from "../utils/Firebase";
import { CircularProgress, Box, Typography } from "@mui/material";

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      const { currentUser } = auth;
      if (currentUser) {
        const userUid = currentUser.uid;
        const linksCollectionRef = collection(
          firestore,
          `users/${userUid}/links`
        );
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
            }, 2000); // Change the delay as desired
          } else {
            setTimeout(() => {
              window.location.href = `http://${longURL}`;
            }, 2000); // Change the delay as desired
          }
        }
      }
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
  // else {
  //   if (auth.currentUser) {
  //     return (
  //       <Box mt={10} textAlign="center">
  //         <Typography>Link is invalid</Typography>
  //       </Box>
  //     );
  //   } else {
  //     return (
  //       <Box mt={10} textAlign="center">
  //         <Typography>Please log in to access the link</Typography>
  //       </Box>
  //     );
  //   }
  // }
};

export default LinkRedirect;
