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
  InputAdornment,
} from "@mui/material";
import { auth } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GrClose } from "react-icons/gr";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import isEmail from "validator/lib/isEmail";

type AuthModalProps = {
  onClose: (
    event: React.MouseEvent<SVGElement, MouseEvent> | {},
    reason: "backdropClick" | "escapeKeyDown" | "success"
  ) => void;
};

const AuthModal = ({ onClose }: AuthModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldform) => ({
      ...oldform,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {
    setLoading(true);
    setEmailError(""); // Clear the email error
    setPasswordError(""); // Clear the password error
    setFirebaseError("");
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        onClose({}, "success");
      } else {
        if (!isEmail(form.email)) {
          setEmailError("Invalid email");
          setLoading(false);
          return;
        }

        await createUserWithEmailAndPassword(auth, form.email, form.password);
        onClose({}, "success");
      }
    } catch (error: any) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          setEmailError("Email already in use");
          break;
        case "auth/invalid-email":
          setEmailError("Invalid email");
          break;
        case "auth/user-not-found":
          setEmailError("No account found with this email");
          break;
        case "auth/wrong-password":
          setPasswordError("Wrong password, Try again");
          break;
        default:
          errorMessage = error.message;
          break;
      }
      setFirebaseError(errorMessage);
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
        <Box pl={3} pt={3} pb={0.5}>
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
        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" flexDirection="column">
            <Typography variant="overline">Enter your Email</Typography>
            <TextField
              value={form.email}
              name="email"
              onChange={handleChange}
              // label="Email"
              variant="outlined"
              required
              size="small"
              error={!!emailError}
              helperText={emailError || ""}
            >
              Email
            </TextField>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="overline">Password</Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              value={form.password}
              name="password"
              onChange={handleChange}
              variant="outlined"
              required
              size="small"
              error={!!passwordError}
              helperText={passwordError || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <MdVisibilityOff
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                        size="1rem"
                      />
                    ) : (
                      <MdVisibility
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                        size="1rem"
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box color="red" mt={2}>
          {/* <Typography>{emailError || error}</Typography> */}
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
          <Button>
            <Typography onClick={() => setIsSignIn((o) => !o)} variant="body2">
              {isSignIn ? "Don't have an account?" : "Already have an account"}
            </Typography>
          </Button>
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
