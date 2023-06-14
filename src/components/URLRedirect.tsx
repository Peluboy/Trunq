import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../utils/Firebase";
import {
  getDoc,
  doc,
  updateDoc,
  increment,
  collectionGroup,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const URLRedirect = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const handleRedirect = async () => {
      console.log("Redirecting...");
      const linksCollectionRef = collectionGroup(firestore, "links");
      const linksQuery = query(
        linksCollectionRef,
        where("shortCode", "==", shortcode)
      );
      const querySnapshot = await getDocs(linksQuery);

      if (!querySnapshot.empty) {
        const linkDocRef = querySnapshot.docs[0].ref;

        const linkDocSnapshot = await getDoc(linkDocRef);
        const linkData = linkDocSnapshot.data();

        if (linkData && linkData.longURL) {
          const { longURL } = linkData;

          console.log("Long URL:", longURL); // Log the longURL

          // Update the totalClicks field of the link
          await updateDoc(linkDocRef, {
            totalClicks: increment(1),
          });

          // Redirect to the long URL
          window.location.replace(longURL);
        } else {
          console.error("Long URL not found");
          // Handle the case when the longURL property is missing
        }
      } else {
        console.error("Shortcode not found");
        // Handle the case when the shortcode does not exist
        // Redirect to an error page or display an error message
      }
    };

    if (shortcode) {
      handleRedirect();
    }
  }, [shortcode]);

  return null; // Since we're redirecting, we don't need to render anything
};

export default URLRedirect;
