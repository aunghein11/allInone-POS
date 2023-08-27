import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Menus from "./components/Menus";
import Addons from "./components/Addons";
import AddonCategories from "./components/AddonCategories";
import MenuCategories from "./components/MenuCategories";
import Settings from "./components/Settings";
import Locations from "./components/Locations";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/addons",
    element: <Addons />,
  },
  {
    path: "/addon-categories",
    element: <AddonCategories />,
  },
  {
    path: "/menu-categories",
    element: <MenuCategories />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={routes} />);
