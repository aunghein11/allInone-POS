import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar";
import { Box } from "@mui/material";
import Register from "./Components/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="Container">
        <Register />
      </div>
    </div>
  );
}

export default App;
