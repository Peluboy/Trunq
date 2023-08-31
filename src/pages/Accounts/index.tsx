import { useState } from "react";
import Analytics from "../../components/Analytics";
import TopBar from "../../components/TopBar";
import UserProfile from "../../components/UserProfile";
import { auth } from "../../utils/Firebase";

const Account = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);

  const updateStats = (newClicks: number, newLinks: number) => {
    setTotalClicks(newClicks);
    setTotalLinks(newLinks);
  };

  // const [updatedDisplayName, setUpdatedDisplayName] = useState<string | null>(
  //   auth.currentUser?.displayName || null
  // );

  // Function to handle updated displayName from Profile component
  // const handleDisplayNameUpdate = (displayName: string) => {
  //   setUpdatedDisplayName(displayName);
  // };

  return (
    <>
      <Analytics totalClicks={totalClicks} totalLinks={totalLinks} />
      <TopBar updateStats={updateStats} />
      {/* <UserProfile onDisplayNameUpdate={handleDisplayNameUpdate} /> */}
    </>
  );
};

export default Account;
