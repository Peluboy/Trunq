import React, { useState, useEffect } from "react";
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
  Checkbox,
  CheckboxProps,
} from "@mui/material";
import { GrClose } from "react-icons/gr";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import isEmail from "validator/lib/isEmail";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";
import { Divider } from "@mui/material";
import GoogleIcon from "./GoogleIcon";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#1463FF",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#1463FF",
  },
});

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

type AuthModalProps = {
  onClose: (
    event: React.MouseEvent<SVGElement, MouseEvent> | {},
    reason: "backdropClick" | "escapeKeyDown" | "success"
  ) => void;
};

const AuthModal = ({ onClose }: AuthModalProps) => {
  const { login, register, handleGoogleSignIn, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

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
    setEmailError("");
    setPasswordError("");
    setFirebaseError("");
    try {
      if (isSignIn) {
        await login(form.email, form.password);
        onClose({}, "success");
      } else {
        if (!isEmail(form.email)) {
          setEmailError("Invalid email");
          setLoading(false);
          return;
        }

        await register(form.email, form.password);
        onClose({}, "success");
      }
    } catch (error: any) {
      let errorMessage = "";
      switch (error.code) {
        case "email-in-use":
          setEmailError(error.message);
          break;
        case "invalid-email":
          setEmailError(error.message);
          break;
        case "user-not-found":
          setEmailError(error.message);
          break;
        case "wrong-password":
          setPasswordError(error.message);
          break;
        default:
          errorMessage = error.message;
          break;
      }

      setFirebaseError(errorMessage);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const isFormValid = form.email !== "" && form.password !== "";

  const resetForm = () => {
    setForm({
      email: "",
      password: "",
    });
    setEmailError("");
    setPasswordError("");
    setFirebaseError("");
    setIsCheckboxChecked(false);
  };

  const handleToggleMode = () => {
    // setIsSignIn((prevState) => !prevState);
    setIsSignIn((o) => !o);
    resetForm();
  };

  useEffect(() => {
    if (currentUser) {
      onClose({}, "success");
    }
  }, [currentUser]);

  return (
    <Dialog open fullWidth onClose={onClose}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box pl={3} pt={3}>
          <Typography variant="h5">
            {isSignIn ? "Welcome back😁" : "Get Started🎉"}
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
          <Box mt={2} textAlign="center">
            <Divider sx={{ my: 1 }}>or</Divider>
          </Box>
          <Button
            onClick={handleGoogleSignIn}
            variant="outlined"
            startIcon={<GoogleIcon />}
          >
            Sign In with Google
          </Button>
        </Box>
        {isSignIn && (
          <Box mt={2} display="flex" justifyContent="flex-start">
            <Link to="/forgot-password" style={{ cursor: "pointer" }}>
              <p
                className="forgot-password-paragraph"
                onClick={() => onClose({}, "backdropClick")}
              >
                Forgot Password
              </p>
            </Link>
          </Box>
        )}
        {!isSignIn && (
          <Box mt={2} display="flex" justifyContent="flex-start">
            <Box display="flex" alignItems="center">
              <BpCheckbox
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
              <p className="terms-condition">
                <a href="/privacy-policy">
                  I agree to Trunq's Privacy and Terms of Use.
                </a>
              </p>
            </Box>
          </Box>
        )}
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
          <Button variant="outlined">
            <Typography
              onClick={handleToggleMode}
              variant="body2"
              color="inherit"
            >
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </Typography>
          </Button>
          <Button
            onClick={handleAuth}
            variant="contained"
            disableElevation
            autoFocus
            color="primary"
            disabled={
              loading || !isFormValid || (!isSignIn && !isCheckboxChecked)
            }
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
