import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const isLargeScreen = useMediaQuery("(min-width:1500px)");
  return (
    <Box
      sx={{
        width: isLargeScreen ? "14%" : "100%",
        backgroundColor: "#283593",
        color: "#ffffff",
        height: "100vh",
        padding: 2,
        borderRight: "1px solid #ddd",
        paddingTop: 3,
      }}
    >
      <Box display="flex" alignItems="center" marginBottom={4}>
        <img
          src={logo}
          alt="Weather App Logo"
          style={{
            width: "40px",
            height: "40px",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        />
        <Typography variant="h6">Weather App</Typography>
      </Box>
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
          { text: "Favorites", icon: <FavoriteIcon />, link: "/favorites" },
          { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
        ].map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.link}
            key={index}
            sx={{
              color: "#c5cae9",
              "&:hover": {
                backgroundColor: "#1a237e",
                color: "#fff",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#c5cae9",
                "&:hover": { color: "#fff" },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
