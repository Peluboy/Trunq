import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  increment,
} from "firebase/firestore";
import { firestore } from "../utils/Firebase";
import { LinkContext } from "../contexts/LinkContext";

const Redirect = () => {
  const location = useLocation();
  const { updateTotalClicks } = useContext(LinkContext);

  useEffect(() => {
    const handleRedirect = async () => {
      const linkCode = location.pathname.substring(1);
      const linkDocRef = doc(collection(firestore, "links"), linkCode);
      const linkDocSnapshot = await getDoc(linkDocRef);

      if (linkDocSnapshot.exists()) {
        const { longURL, totalClicks } = linkDocSnapshot.data();
        const clicks = typeof totalClicks === "number" ? totalClicks : 0;

        // Increment click count
        await updateDoc(linkDocRef, { totalClicks: increment(1) });

        updateTotalClicks(clicks + 1); // Update the totalClicks value

        console.log("Total clicks:", clicks + 1); // Log the updated value

        window.location.href = longURL; // Redirect to the longURL
      } else {
        // Handle invalid or non-existent shortcode
        console.log("Invalid shortcode or link does not exist");
      }
    };

    handleRedirect();
  }, [location.pathname, updateTotalClicks]);

  return <div>Redirecting...</div>;
};

export default Redirect;
