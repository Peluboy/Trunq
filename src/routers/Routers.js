import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import Account from "../pages/Accounts";
import { auth } from "../utils/Firebase";
import { Box, CircularProgress } from "@mui/material";
import LinkRedirect from "../components/LinkRedirect";

const Routers = () => {
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={user ? <Navigate to="/dashboard" /> : <Home />}
      />
      <Route
        path="/dashboard"
        element={user ? <Account /> : <Navigate to="/home" />}
      />
      <Route path="/:shortCode" element={<LinkRedirect />} />
    </Routes>
  );
};

export default Routers;
