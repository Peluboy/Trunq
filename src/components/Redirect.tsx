import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  increment,
} from "firebase/firestore";
import { firestore, auth } from "../utils/Firebase";
import { LinkContext } from "../contexts/LinkContext";

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
        const { longURL, totalClicks, userUid } = linkDocSnapshot.data();
        const clicks = typeof totalClicks === "number" ? totalClicks : 0;

        if (auth.currentUser) {
          // User is authenticated
          // Increment click count in the root directory
          const rootLinkDocRef = doc(collection(firestore, "links"), linkCode);
          await updateDoc(rootLinkDocRef, { totalClicks: increment(1) });

          // Increment click count in the user's subcollection
          if (userUid) {
            const userLinkDocRef = doc(
              collection(firestore, `users/${userUid}/links`),
              linkCode
            );
            await updateDoc(userLinkDocRef, { totalClicks: increment(1) });

            // Update the totalClicks value in the user's document
            const userDocRef = doc(collection(firestore, "users"), userUid);
            await updateDoc(userDocRef, { totalClicks: increment(1) });
          }

          // Update the totalClicks value in the LinkContext immediately
          updateTotalClicks(clicks + 1);

          console.log("Total clicks:", clicks + 1); // Log the updated value
        } else {
          // User is not authenticated (logged out)
          // Handle the scenario where the user is not logged in
          // You can choose to redirect the user to a login page or show an error message
          setError(true);
        }

        // Redirect to the longURL
        window.location.href = longURL;
      } else {
        // Handle invalid or non-existent shortcode
        setError(true);
      }

      setIsLoading(false);
    };

    handleRedirect();
  }, [location.pathname, updateTotalClicks]);

  if (isLoading) {
    return <div>Redirecting...</div>;
  }

  if (error) {
    return <div>Link is invalid or you are not logged in.</div>;
  }

  return null;
};

export default Redirect;
