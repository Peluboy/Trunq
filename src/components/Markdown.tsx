import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../utils/Firebase";

interface MarkdownProps {
  shortcode: string;
}

const Markdown: React.FC<MarkdownProps> = ({ shortcode }) => {
  const [longURL, setLongURL] = useState("");

  useEffect(() => {
    const fetchLongURL = async () => {
      try {
        const docRef = doc(firestore, "urls", shortcode);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLongURL(data.longURL);
        } else {
          console.log("URL not found for the given shortcode.");
        }
      } catch (error) {
        console.error("Error fetching long URL:", error);
      }
    };

    fetchLongURL();
  }, [shortcode]);

  return (
    <div>
      {/* Render the long URL */}
      <p>Long URL: {longURL}</p>
    </div>
  );
};

export default Markdown;
