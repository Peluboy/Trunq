import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Account from "../pages/Accounts";

const Routers = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="home" />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Account />} />
    </Routes>
  );
};

export default Routers;
