import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Account from "../pages/Accounts";
import { auth } from "../utils/Firebase";
import { Box, CircularProgress } from "@mui/material";

const Routers = () => {
  const [user, setUser] = useState(null);
  const [intialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (intialLoad)
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="home" />} /> */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Home />}
      />
      <Route
        path="/dashboard"
        element={user ? <Account /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default Routers;
