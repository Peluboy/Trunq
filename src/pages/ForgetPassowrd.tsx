import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { BsArrowLeft, BsCheckCircle } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setError("");
    setLoading(true);

    try {
      await forgotPassword(email);
      console.log("Password reset email sent successfully");
      toast.success("Password reset successfully");
      setEmailSent(true);

      const redirectTimeout = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => {
        clearTimeout(redirectTimeout);
      };
    } catch (error) {
      setLoading(false);
      setError("Failed to send password reset email");
      toast.error("User not found");
      console.log("Failed to send password reset email", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <ToastContainer position="bottom-center" />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="85vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
          borderRadius=".5rem"
          maxWidth="500px"
          padding="2rem"
        >
          <Typography variant="h5">Forget Password</Typography>
          <Box mt={2} width="100%">
            <Typography variant="overline">Enter your Email</Typography>
            <TextField
              name="email"
              variant="outlined"
              required
              fullWidth
              size="small"
              onChange={handleChange}
            />
            <Box mt={1}>
              {!emailSent ? (
                <Button
                  disableElevation
                  variant="contained"
                  fullWidth
                  onClick={handleResetPassword}
                  disabled={!isEmailValid(email) || loading}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              ) : (
                <Box></Box>
              )}
              <Box mt={1}>
                <Link to="/">
                  <Box display="flex" gap={1}>
                    <Box ml=".2rem" display="flex" alignItems="center">
                      <BsArrowLeft />
                    </Box>
                    <p className="terms-condition">Go Back</p>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
