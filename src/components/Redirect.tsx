import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../utils/Firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const Redirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const linkDoc = await getDoc(doc(firestore, "links", shortCode || ""));

        if (!linkDoc.exists()) {
          setError(true);
          return;
        }

        const { longURL } = linkDoc.data();
        
        // Update click count
        await updateDoc(doc(firestore, "links", shortCode || ""), {
          totalClicks: increment(1)
        });

        // Set meta refresh for immediate redirect
        const meta = document.createElement("meta");
        meta.httpEquiv = "refresh";
        meta.content = `0;url=${longURL}`;
        document.head.appendChild(meta);

        // Fallback redirect
        window.location.href = longURL;
      } catch (err) {
        console.error("Redirect error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRedirect();
  }, [shortCode]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Link Not Found</h1>
          <p className="mt-2 text-gray-600">The requested link does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Redirect;
