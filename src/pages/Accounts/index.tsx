import { useState, useContext } from "react";
import Analytics from "../../components/Analytics";
import TopBar from "../../components/TopBar";

const Account = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);

  const updateStats = (newClicks: number, newLinks: number) => {
    setTotalClicks(newClicks);
    setTotalLinks(newLinks);
  };

  return (
    <>
      <Analytics totalClicks={totalClicks} totalLinks={totalLinks} />
      <TopBar updateStats={updateStats} />
    </>
  );
};

export default Account;
