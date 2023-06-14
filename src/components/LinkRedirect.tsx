import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../utils/Firebase";
import { CircularProgress, Box, Typography } from "@mui/material";
import { getDoc, doc, updateDoc, increment } from "firebase/firestore";

interface LinkData {
  longURL: string;
  linkID: string;
  userUid: string;
}

const LinkRedirect = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      if (shortCode && shortCode.length !== 6) return setLoading(false);
      const linkDocRef = doc(firestore, "links", shortCode!);
      const linkDoc = await getDoc(linkDocRef);
      if (linkDoc.exists()) {
        const { longURL, linkID, userUid } = linkDoc.data() as LinkData;
        const userLinkDocRef = doc(
          firestore,
          "users",
          userUid,
          "links",
          linkID
        );
        await updateDoc(userLinkDocRef, {
          totalClicks: increment(1),
        });
        window.location.href = longURL;
      } else {
        setLoading(false);
      }
    };
    fetchLinkDoc();
  }, [shortCode]);

  if (loading)
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting to the link</Typography>
      </Box>
    );
  else
    return (
      <Box mt={10} textAlign="center">
        <Typography>Link is invalid</Typography>
      </Box>
    );
};

export default LinkRedirect;
