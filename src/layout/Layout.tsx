import { useState } from "react";
import Routers from "../routers/Routers";
import Navbar from "../components/Navbar";
import { auth } from "../utils/Firebase";

const Layout = () => {
  const [updatedDisplayName] = useState<string | null>(
    auth.currentUser?.displayName || null
  );
  return (
    <>
      <Navbar displayName={updatedDisplayName} />
      <Routers />
    </>
  );
};

export default Layout;
