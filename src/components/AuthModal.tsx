import React, { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { auth } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GrClose } from "react-icons/gr";

type AuthModalProps = {
  onClose: (
    event: React.MouseEvent<SVGElement, MouseEvent> | {},
    reason: "backdropClick" | "escapeKeyDown" | "success"
  ) => void;
};

const AuthModal = ({ onClose }: AuthModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldform) => ({
      ...oldform,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        onClose({}, "success");
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
          setError("Invalid email");
          return;
        }

        await createUserWithEmailAndPassword(auth, form.email, form.password);
        onClose({}, "success");
      }
    } catch (error: any) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        default:
          errorMessage = error.message;
          break;
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box pl={3} pt={3} pb={1.5}>
          <Typography variant="h5">
            {isSignIn ? "Welcome back!" : "Get Started!"}
          </Typography>
        </Box>

        <Box mr={3}>
          <GrClose
            cursor="pointer"
            onClick={(event: React.MouseEvent<SVGElement>) =>
              onClose(event, "backdropClick")
            }
          />
        </Box>
      </Box>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            value={form.email}
            name="email"
            onChange={handleChange}
            label="Email"
          >
            Email
          </TextField>
          <TextField
            type="password"
            value={form.password}
            name="password"
            onChange={handleChange}
            label="Password"
          >
            Password
          </TextField>
        </Box>
        <Box color="red" mt={2}>
          <Typography>{error}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          mx={2}
        >
          <Typography onClick={() => setIsSignIn((o) => !o)}>
            {isSignIn ? "Don't have an account?" : "Already have an account"}
          </Typography>
          <Button
            onClick={handleAuth}
            variant="contained"
            disableElevation
            autoFocus
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
