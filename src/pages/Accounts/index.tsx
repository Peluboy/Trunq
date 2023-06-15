import { useState } from "react";
import Analytics from "../../components/Analytics";
import TopBar from "../../components/TopBar";
// import TopBar2 from "../../components/Topbar2";
import ShortenLinkForm from "../../components/ShortenLinkForm";
import { LinkProvider } from "../../contexts/LinkContext";

const Account = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);

  const updateStats = (newClicks: number, newLinks: number) => {
    setTotalClicks(newClicks);
    setTotalLinks(newLinks);
  };

  return (
    <>
      <LinkProvider>
        <Analytics totalClicks={totalClicks} totalLinks={totalLinks} />
        <TopBar updateStats={updateStats} />
      </LinkProvider>
      {/* <ShortenLinkForm /> */}
      {/* <TopBar2 updateStats={updateStats} /> */}
    </>
  );
};

export default Account;
