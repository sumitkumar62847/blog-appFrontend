import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";

const Header = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. REPLACED: Hardcoded value is now dynamic state
  // We default to 'false' (logged out) and let the effect update it.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. ADDED: Your effect to check auth status on component mount
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userId]); // Empty array '[]' means this runs only ONCE when the component loads

  // 3. KEPT: The existing effect to sync tabs with the URL
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/blogs/add")) {
      setValue(2);
    } else if (path.startsWith("/myBlogs")) {
      setValue(1);
    } else if (path.startsWith("/blogs")) {
      setValue(0);
    } else if (path === "/") {
      setValue(0);
    }
  }, [location.pathname]); // This runs every time the URL path changes

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleLoginClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: false } });
  };

  const handleSignupClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: true } });
  };

  // This function would be called from your Login component on success
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear the user's session
    setIsLoggedIn(false); // Update the state
    navigate("/login"); // Redirect to login
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "background.paper",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
      elevation={0}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            textDecoration: "none",
          }}
        >
          BlogsApp
        </Typography>

        {/* This section now dynamically shows/hides based on state */}
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="primary"
              indicatorColor="primary"
              value={value}
              onChange={handleTabChange}
            >
              <Tab component={Link} to="/blogs" label="All Blogs" />
              <Tab component={Link} to="/myBlogs" label="My Blogs" />
              <Tab component={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {/* This section also dynamically shows/hides */}
          {!isLoggedIn && (
            <>
              <Button
                onClick={handleLoginClick}
                variant="outlined"
                color="primary"
                sx={{ margin: 1, borderRadius: "20px" }}
              >
                Login
              </Button>
              <Button
                onClick={handleSignupClick}
                variant="contained"
                color="primary"
                sx={{ margin: 1, borderRadius: "20px" }}
              >
                SignUp
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={handleLogout} // Changed to call the logout function
              variant="outlined"
              color="primary"
              sx={{ margin: 1, borderRadius: "20px" }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;