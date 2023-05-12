import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";

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
        value={form.password}
        name="password"
        onChange={handleChange}
        label="Password"
      >
        Password
      </TextField>
      <Button onClick={() => console.log(form)}>Sign In</Button>
    </>
  );
};

export default Home;
