import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const userRegister = async () => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      navigate("/");
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          maxWidth: "300px",
          mt: 5,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          sx={{ mb: 3 }}
          onChange={(evt) => setUser({ ...user, name: evt.target.value })}
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          sx={{ mb: 3 }}
          onChange={(evt) => setUser({ ...user, email: evt.target.value })}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          sx={{ mb: 3 }}
          onChange={(evt) => setUser({ ...user, password: evt.target.value })}
        />
        <Button variant="contained" onClick={userRegister}>
          REGISTER
        </Button>
      </Box>
    </Layout>
  );
};

export default Register;
