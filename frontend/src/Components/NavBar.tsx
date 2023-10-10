import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config/config";

const sidebarMenuItems = [
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/",
  },
  {
    id: 2,
    label: "Menus",
    icon: <RestaurantMenuIcon />,
    route: "/menus",
  },
  {
    id: 3,
    label: "Menu Categories",
    icon: <MenuBookIcon />,
    route: "/menu-categories",
  },
  {
    id: 4,
    label: "Addons",
    icon: <LunchDiningIcon />,
    route: "/addons",
  },
  {
    id: 5,
    label: "Addons Categories",
    icon: <RestaurantIcon />,
    route: "/addon-categories",
  },
  {
    id: 6,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/locations",
  },
  {
    id: 7,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/settings",
  },
];

interface Props {
  title?: string;
}

const NavBar = ({ title }: Props) => {
  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navBarTitle = title ? `All In One POS - ${title}` : "All In One POS";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const renderDrawer = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {sidebarMenuItems.slice(0, 6).map((item) => (
          <Link
            to={item.route}
            key={item.id}
            style={{ textDecoration: "none", color: "#313131" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((item) => (
          <Link
            to={item.route}
            key={item.id}
            style={{ textDecoration: "none", color: "#313131" }}
          >
            <ListItem key={item.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {navBarTitle}
          </Typography>
          {accessToken ? (
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", textDecoration: "none" }}
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/logout");
              }}
            >
              Log Out
            </Typography>
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", textDecoration: "none" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              {window.location.pathname === "/login" ? "" : "Log In"}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box>
        <Drawer
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          {renderDrawer()}
        </Drawer>
      </Box>
    </Box>
  );
};
export default NavBar;
