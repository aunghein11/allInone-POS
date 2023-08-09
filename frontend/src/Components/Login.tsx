import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const userLogin = async () => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      navigate("/");
    }
    // const data = await response.json();
    // console.log(data);
  };
  return (
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
      <Button variant="contained" onClick={userLogin}>
        LOG IN
      </Button>
    </Box>
  );
};

export default Login;
