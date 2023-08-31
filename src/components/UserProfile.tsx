import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { auth } from "../utils/Firebase";
import {
  User,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define a custom type that extends User to include displayName
interface CustomUser extends User {
  displayName: string | null;
}

const Profile = ({
  onDisplayNameUpdate,
}: {
  onDisplayNameUpdate: (displayName: string) => void;
}) => {
  const user = auth.currentUser as CustomUser;
  const navigate = useNavigate();

  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/home");
    });
  };

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDisplayName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmailValue = event.target.value;
    setNewEmail(newEmailValue);

    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(newEmailValue)) {
      setEmailError("Invalid email format");
      //   setIsSaveDisabled(true);
    } else {
      setEmailError("");
      setIsSaveDisabled(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (newPassword !== confirmPasswordValue) {
      setConfirmPasswordError("Passwords do not match");
      setIsSaveDisabled(true);
    } else {
      setConfirmPasswordError("");
      setIsSaveDisabled(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");

      // Validation checks
      if (newEmail !== user.email) {
        try {
          await updateEmail(user, newEmail);
        } catch (error: any) {
          setEmailError("Invalid email");
          return;
        }
      }

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          setConfirmPasswordError("Passwords do not match");
          setIsSaveDisabled(true);
          return;
        }

        try {
          await updatePassword(user, newPassword);
        } catch (error: any) {
          setPasswordError(error.message);
          setIsSaveDisabled(true);
          return;
        }
      }

      if (newDisplayName !== user.displayName) {
        await updateProfile(user, {
          displayName: newDisplayName,
        });
        onDisplayNameUpdate(newDisplayName);
      }

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error:", error.message);
      } else {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <Box>
      <ToastContainer position="bottom-center" />

      <Typography variant="h5">Profile Settings</Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="80vh"
      >
        <Box>
          <Box
            mb={2}
            mt={2}
            sx={{
              display: "grid",
              gap: ".7rem",
              gridTemplateColumns: "1fr",
            }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="overline">Enter Display Name</Typography>
              <TextField
                variant="outlined"
                value={newDisplayName}
                onChange={handleDisplayNameChange}
                fullWidth
                size="small"
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="overline">Change Email </Typography>
              <TextField
                variant="outlined"
                value={newEmail}
                onChange={handleEmailChange}
                fullWidth
                size="small"
                error={!!emailError}
                helperText={emailError || ""}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="overline">Change Password</Typography>
              <TextField
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                fullWidth
                size="small"
                error={!!passwordError}
                helperText={passwordError || ""}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="overline">Confirm Password</Typography>
              <TextField
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                fullWidth
                size="small"
                error={!!confirmPasswordError}
                helperText={confirmPasswordError || ""}
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" gap={2}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              onClick={handleSaveChanges}
              disabled={isSaveDisabled}
            >
              Save
            </Button>
            <Button
              disableElevation
              color="primary"
              variant="contained"
              onClick={handleLogout}
              //   sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              Log Out
            </Button>
          </Box>
        </Box>

        <Box>
          <Link
            href="https://www.buymeacoffee.com/pelumimoses"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outlined"
              // color="secondary"
              fullWidth
              disableElevation
              size="large"
            >
              Buy Me a Coffee ☕
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
