import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDoc, doc, runTransaction, collection } from "firebase/firestore";
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
        const { longURL, totalClicks } = linkDocSnapshot.data();
        const clicks = typeof totalClicks === "number" ? totalClicks : 0;

        const transactionRef = doc(collection(firestore, "links"), linkCode);

        try {
          await runTransaction(firestore, async (transaction) => {
            const docSnapshot = await transaction.get(transactionRef);
            if (!docSnapshot.exists()) {
              setError(true);
              return;
            }

            const newTotalClicks = (docSnapshot.data()?.totalClicks || 0) + 1;
            transaction.update(transactionRef, { totalClicks: newTotalClicks });
            updateTotalClicks(newTotalClicks);
          });

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
