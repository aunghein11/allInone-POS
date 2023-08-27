import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Box, Typography } from "@mui/material";
import Register from "./components/Register";
import Layout from "./components/Layout";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  console.log("App component", accessToken);
  return (
    <Layout>
      <div className="App">
        <Box sx={{ color: "black" }}>
          <Typography variant="h3">Welcome to Foodie POS</Typography>
        </Box>
      </div>
    </Layout>
  );
}

export default App;
