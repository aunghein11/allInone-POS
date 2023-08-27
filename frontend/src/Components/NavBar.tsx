import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
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
import SettingsIcon from "@mui/icons-material/Settings";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";

const sidebarMenuItems = [
  {
    id: 1,
    label: "Oders",
    icon: <LocalMallIcon />,
    route: "/orders",
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
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/settings",
  },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        {sidebarMenuItems.slice(0, 5).map((item) => (
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            All In One - POS
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
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
