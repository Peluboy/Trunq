import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { auth } from "../../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Home = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((oldform) => ({
      ...oldform,
      [event.target.name]: event.target.value,
    }));

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Email already in use");
        // show error message to the user
      } else if (error.code === "auth/invalid-email") {
        console.log("Invalid email");
        // show error message to the user
      } else {
        console.log(error.message);
        // show error message to the user
      }
    }
  };

  const handleSignin = async () => {
    await signInWithEmailAndPassword(auth, form.email, form.password);
  };

  // console.log(auth.currentUser);

  return (
    <>
      <Typography>Home Page</Typography>
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
      <Button onClick={handleSignup}>Sign Up</Button>
      <Button onClick={handleSignin}>Sign In</Button>
    </>
  );
};

export default Home;
