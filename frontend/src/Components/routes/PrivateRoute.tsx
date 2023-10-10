import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../AppContext";
import { config } from "../../config/config";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
