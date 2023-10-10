import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { config } from "../config/config";
import { AppContext } from "./AppContext";

const Login = () => {
  const { fetchData } = useContext(AppContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const userLogin = async () => {
    const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const responseData = await response.json();
      const accessToken = responseData.accessToken;
      localStorage.setItem("accessToken", accessToken);

      navigate("/");
    }
    // const data = await response.json();
    // console.log(data);
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
        <Link to="/register" style={{ marginTop: "20px", textAlign: "center" }}>
          <Typography>If you are not registered, click here..</Typography>
        </Link>
      </Box>
    </Layout>
  );
};

export default Login;
