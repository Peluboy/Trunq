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

const ForgetPassword = () => {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (emailSent) {
      const redirectTimeout = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => {
        clearTimeout(redirectTimeout);
      };
    }
  }, [emailSent, navigate]);

  const handleResetPassword = async () => {
    setError("");
    setLoading(true);
    setEmailSent(true);

    try {
      await forgotPassword(email);
      console.log("Password reset email sent successfully");
    } catch (error) {
      setLoading(false);
      setError("Failed to send password reset email");
      console.log("Failed to send password reset email", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
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
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            ) : (
              <Box display="flex" alignItems="center">
                <BsCheckCircle color="green" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Email sent
                </Typography>
              </Box>
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
  );
};

export default ForgetPassword;
