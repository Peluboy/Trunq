import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Account from "../pages/Accounts";
import { auth } from "../utils/Firebase";
import { Box, CircularProgress } from "@mui/material";
import ForgetPassword from "../pages/ForgetPassowrd";
import ResetPassword from "../pages/ResetPassword";
import ErrorPage from "../pages/ErrorPage";
import Redirect from "../components/Redirect";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Layout from "../layout/Layout";

const LayoutRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Account />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Layout>
);

const Routers = () => {
  const [user, setUser] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
    return () => unsubscribe();
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
      <Route path="/home" element={user ? <Navigate to="/dashboard" /> : <Home />} />
      <Route path="/dashboard" element={user ? <Account /> : <Navigate to="/home" />} />
      {/* <Route path="/:shortCode" element={<Redirect />} /> */}
      <Route path="*" element={<LayoutRoutes />} />
    </Routes>
  );
};

export default Routers;
