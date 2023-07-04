import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../utils/Firebase";
import { LinkContext } from "../contexts/LinkContext";
import { Typography, Box } from "@mui/material";

const Redirect = () => {
  const location = useLocation();
  const { updateTotalClicks } = useContext(LinkContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      const linkCode = location.pathname.substring(1);
      const linkDocRef = doc(collection(firestore, "links"), linkCode);
      const linkDocSnapshot = await getDoc(linkDocRef);

      if (linkDocSnapshot.exists()) {
        const { longURL, totalClicks, lastClickedAt } = linkDocSnapshot.data();
        const clicks = typeof totalClicks === "number" ? totalClicks : 0;

        if (lastClickedAt) {
          const currentTime = Date.now();
          const lastClickedTime = lastClickedAt.toMillis();
          const timeDifference = currentTime - lastClickedTime;
          const MIN_CLICK_INTERVAL = 1000;

          if (timeDifference < MIN_CLICK_INTERVAL) {
            window.location.href = longURL;
            return;
          }
        }

        try {
          await updateDoc(linkDocRef, {
            totalClicks: clicks + 1,
            lastClickedAt: serverTimestamp(),
          });

          updateTotalClicks(clicks + 1);

          window.location.href = longURL;
        } catch (error) {
          setError(true);
        }
      } else {
        setError(true);
      }

      setIsLoading(false);
    };

    handleRedirect();
  }, [location.pathname, updateTotalClicks]);

  if (isLoading) {
    return (
      <Box mt={4} ml={4}>
        <Typography
          variant="h5"
          fontWeight={500}
          fontSize="1.3rem"
          textTransform="none"
        >
          Redirecting... 🚀
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} ml={4}>
        <Typography
          variant="h5"
          fontWeight={500}
          fontSize="1.3rem"
          textTransform="none"
        >
          Link is invalid 😣
        </Typography>
      </Box>
    );
  }

  return null;
};

export default Redirect;
