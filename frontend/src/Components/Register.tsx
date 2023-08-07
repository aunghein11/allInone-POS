import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const userRegister = async () => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
        mt: -40,
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
  );
};

export default Register;
