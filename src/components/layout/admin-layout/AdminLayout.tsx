"use client";

import React from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const drawerWidth = 260;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // useCheckLogin();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: "#1c2434",
        color: "#cbd5e1",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <AdminSidebar />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Mobile Drawer */}
      {!isSmUp && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1c2434",
              color: "#cbd5e1",
              overflow: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Desktop Sidebar */}
      {isSmUp && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1c2434",
              color: "#cbd5e1",
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          bgcolor: "#ededed",
        }}
      >
        {/* Header */}
        <AppBar
          position="static"
          elevation={1}
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            px: 2,
            py: 1,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Mobile Menu Button */}
            {!isSmUp && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <AdminHeader />
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
}
