import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import App from "../../App";
import Menus from "../Menus";
import Addons from "../Addons";
import AddonCategories from "../AddonCategories";
import MenuCategories from "../MenuCategories";
import Locations from "../Locations";
import Settings from "../Settings";
import Login from "../Login";
import Register from "../Register";
import Logout from "../Logout";
import CreateMenus from "../CreateMenus";
import Tables from "../Tables";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/create-menus" Component={CreateMenus} />
          <Route path="/addons" Component={Addons} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/menu-categories" Component={MenuCategories} />
          <Route path="/tables" Component={Tables} />
          <Route path="/locations" Component={Locations} />
          <Route path="/settings" Component={Settings} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="logout" Component={Logout} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
