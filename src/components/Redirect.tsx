import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDoc, doc, collection, updateDoc } from "firebase/firestore";
import { firestore } from "../utils/Firebase";

const Redirect = () => {
  const location = useLocation();

  useEffect(() => {
    const handleRedirect = async () => {
      const linkCode = location.pathname.substring(1);
      const linkDocRef = doc(collection(firestore, "links"), linkCode);
      const linkDocSnapshot = await getDoc(linkDocRef);

      if (linkDocSnapshot.exists()) {
        const { longURL, totalClicks = 0 } = linkDocSnapshot.data();
        await updateDoc(linkDocRef, {
          totalClicks: totalClicks + 1,
        });
        window.location.replace(longURL);
      } else {
        window.location.replace("*");
      }
    };

    handleRedirect();
  }, [location.pathname]);

  return null;
};

export default Redirect;
