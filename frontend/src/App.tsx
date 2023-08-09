import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Box, Typography } from "@mui/material";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Box sx={{ color: "black" }}>
        <Typography variant="h3">Welcome to Foodie POS</Typography>
      </Box>
    </div>
  );
}

export default App;
