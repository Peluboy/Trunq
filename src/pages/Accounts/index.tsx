import { useState } from "react";
import Analytics from "../../components/Analytics";
// import TopBar from "../../components/TopBar";
import TopBar2 from "../../components/Topbar2";

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
      {/* <TopBar updateStats={updateStats} /> */}
      <TopBar2 updateStats={updateStats} />
    </>
  );
};

export default Account;
