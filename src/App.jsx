import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Favorites from "./components/Favorites";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Settings = () => <div>Settings Content</div>;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1500px)");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Router>
      <Box display="flex" flexDirection={isLargeScreen ? "row" : "column"}>
        {(isLargeScreen || isSidebarOpen) && <Sidebar />}

        <Box sx={{ flexGrow: 1, padding: 3 }}>
          {!isLargeScreen && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{
                display: { xs: "block", md: "none" },
                position: "absolute",
                top: 20,
                left: 50,
                zIndex: 1,
              }}
            >
              {isSidebarOpen ? (
                <CloseIcon
                  sx={{ color: "white", position: "absolute", left: 300 }}
                />
              ) : (
                <MenuIcon sx={{ color: "inherit" }} />
              )}
            </IconButton>
          )}

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
        <Box
          sx={{
            width: isLargeScreen ? "18%" : "100%",
            backgroundColor: "#fff",
            padding: 2,
            borderTop: isLargeScreen ? "none" : "1px solid #ddd",
            borderLeft: isLargeScreen ? "1px solid #ddd" : "none",
            height: "100vh",
          }}
        >
          <Favorites />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
