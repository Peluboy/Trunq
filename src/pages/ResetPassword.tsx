import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const query = useQuery();
  console.log(query.get("mode"), query.get("oobCode"));

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setPasswordMatch(value === newPassword);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        await resetPassword(query.get("oobCode"), newPassword);
        toast.success("Password reset successfully");
        navigate("/home");
      } catch (error: any) {
        console.error(error.message);
        if (error.code === "weak-password") {
          toast.error("Password should be at least 6 characters");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } else {
      setPasswordMatch(false);
    }
  };

  const isButtonDisabled = !newPassword || !confirmPassword || !passwordMatch;

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
          <Typography variant="h5">Reset Password</Typography>
          <form onSubmit={handleSubmit}>
            <Box mt={2} width="100%">
              <Typography variant="overline">New Password</Typography>
              <TextField
                name="newPassword"
                variant="outlined"
                type="password"
                required
                fullWidth
                size="small"
                value={newPassword}
                onChange={handleChange}
              />
            </Box>
            <Box mt={1} width="100%">
              <Typography variant="overline">Confirm Password</Typography>
              <TextField
                name="confirmPassword"
                variant="outlined"
                type="password"
                required
                fullWidth
                size="small"
                error={!passwordMatch}
                helperText={!passwordMatch && "Passwords do not match"}
                value={confirmPassword}
                onChange={handleChange}
              />
            </Box>
            <Box mt={2} width="100%">
              <Button
                disableElevation
                variant="contained"
                fullWidth
                type="submit"
                disabled={isButtonDisabled}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
