"use client";

import React, { useRef, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import Link from "next/link";
import {
  StyledAccountCircleIcon,
  StyledHeaderBox,
  StyledInnerHeaderBox,
  StyledLogoutIcon,
  StyledSettingIcon,
  StyledPersonIcon,
} from "./style";

const AdminHeader = () => {
  // useCheckLogin();
  const headerRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledHeaderBox ref={headerRef}>
      <StyledInnerHeaderBox>
        <IconButton onClick={handleMenuClick} sx={{ borderRadius: 0 }}>
          <StyledAccountCircleIcon />
          <Typography>{localStorage.getItem("user_name")}</Typography>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem component={Link} href="/admin/setting">
            <ListItemIcon>
              <StyledSettingIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem component={Link} href="/admin/profile">
            <ListItemIcon>
              <StyledPersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <Divider />
          <MenuItem component={Link} href="/admin/login">
            <ListItemIcon>
              <StyledLogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </StyledInnerHeaderBox>
    </StyledHeaderBox>
  );
};

export default AdminHeader;
