import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  confirmPasswordReset,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  login: (email, password) => Promise,
  register: (email, password) => Promise,
  logout: () => Promise,
  forgotPassword: (email) => Promise,
  resetPassword: (oobCode, newPassword) => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("The user is", currentUser);
  }, [currentUser]);

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let errorMessage = "";
      let errorCode = "";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorCode = "email-in-use";
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorCode = "invalid-email";
          errorMessage = "Invalid email";
          break;
        case "auth/user-not-found":
          errorCode = "user-not-found";
          errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorCode = "wrong-password";
          errorMessage = "Wrong password, try again";
          break;
        default:
          errorMessage = error.message;
          break;
      }

      throw { code: errorCode, message: errorMessage };
    }
  }

  async function register(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let errorMessage = "";
      let errorCode = "";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorCode = "email-in-use";
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorCode = "invalid-email";
          errorMessage = "Invalid email";
          break;
        default:
          errorMessage = error.message;
          break;
      }

      throw { code: errorCode, message: errorMessage };
    }
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/home`,
    });
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword).catch((error) => {
      let errorMessage = "";
      let errorCode = "";

      switch (error.code) {
        case "auth/weak-password":
          errorCode = "weak-password";
          errorMessage = "Password should be at least 6 characters";
          break;
        default:
          errorMessage = error.message;
          break;
      }

      throw { code: errorCode, message: errorMessage };
    });
  }

  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
