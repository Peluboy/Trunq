import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query, limit, getDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "../utils/Firebase";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { LinkCardProps } from "../types/types";

export const useLinks = (updateStats: (clicks: number, links: number) => void) => {
  const [links, setLinks] = useState<LinkCardProps[]>([]);
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const fetchLinks = async () => {
      const userUid = auth.currentUser?.uid;
      const linksPathRef = collection(firestore, `users/${userUid}/links`);
      const linksQuery = query(linksPathRef, limit(20));
      const querySnapshot = await getDocs(linksQuery);

      const tempLinks: LinkCardProps[] = [];
      let clicks = 0;

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const createdAt = data.createdAt.toDate();
        const link: LinkCardProps = {
          id: doc.id,
          name: data.name,
          longURL: data.longURL,
          createdAt,
          totalClicks: data.totalClicks,
          shortCode: data.shortCode || "",
          copyLink: handleCopyLink,
          deleteLink: handleDeleteLink,
          description: data.description || "",
          customURL: data.customURL || "",
          clickLocation: Array.isArray(data.clickLocation) ? data.clickLocation : [],
          expiresAt: data.expiresAt
            ? (data.expiresAt.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt))
            : null,
        };

        tempLinks.push(link);
        clicks += data.totalClicks;
      }

      tempLinks.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      setLinks(tempLinks);
      setTotalClicks(clicks);
      updateStats(clicks, tempLinks.length);
      setFetchingLinks(false);
    };

    fetchLinks();
  }, [updateStats]);

  const handleDeleteLink = useCallback(async (linkDocID: string) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      const userUid = auth.currentUser?.uid;
      if (userUid) {
        const linkDocRef = doc(firestore, `users/${userUid}/links`, linkDocID);
        await deleteDoc(linkDocRef);
        setLinks((prevLinks) => {
          const updatedLinks = prevLinks.filter((link) => link.id !== linkDocID);
          updateStats(totalClicks, updatedLinks.length);
          return updatedLinks;
        });
      }
    }
  }, [totalClicks, updateStats]);

  const handleCopyLink = useCallback((shortUrl: string) => {
    copy(shortUrl);
    toast.success("Link copied successfully");
  }, []);

  return { links, fetchingLinks, totalClicks, handleDeleteLink, handleCopyLink, setLinks };
};
