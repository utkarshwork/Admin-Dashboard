"use client";

import React from "react";
import { Box, Typography, List } from "@mui/material";
import NextLink from "next/link";
import { Notifications } from "@mui/icons-material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { usePathname } from "next/navigation";
import theme from "@/theme";
import AdminLogo from "./AdminLogo";

const SidebarLink = ({
  href,
  icon,
  label,
  onClick,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <Box
    component={NextLink}
    href={href}
    onClick={onClick}
    display="flex"
    alignItems="flex-start"
    px={2}
    py={1.5}
    sx={{
      textDecoration: "none",
      transition: ".6s",
      color: isActive ? "#fff" : "#cbd5e1",
      backgroundColor: isActive ? "#0f172a" : "transparent",
      "&:hover": { backgroundColor: "#0f1726" },
      borderLeft: isActive
        ? `4px solid ${theme.palette.survey.buttonPink}`
        : "4px solid transparent",
    }}
  >
    <Box mr={2}>{icon}</Box>
    <Typography fontWeight={isActive ? "bold" : "normal"}>{label}</Typography>
  </Box>
);

const AdminSidebar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  // useCheckLogin();
  const pathname = usePathname();

  return (
    <>
      <AdminLogo />
      <List>
        <SidebarLink
          href="/admin/dashboard"
          icon={
            <SpaceDashboardIcon
              sx={{ color: theme.palette.survey.buttonPink }}
            />
          }
          label="Dashboard"
          isActive={pathname === "/admin/dashboard"}
          onClick={onLinkClick}
        />
        <SidebarLink
          href="/admin/questions"
          icon={<HelpIcon sx={{ color: theme.palette.survey.buttonPink }} />}
          label="Questions"
          isActive={pathname === "/admin/questions"}
          onClick={onLinkClick}
        />
        <SidebarLink
          href="/admin/participant"
          icon={
            <Diversity3Icon sx={{ color: theme.palette.survey.buttonPink }} />
          }
          label="Participant"
          isActive={pathname === "/admin/participant"}
          onClick={onLinkClick}
        />
        <SidebarLink
          href="/admin/subscriber"
          icon={
            <AdsClickIcon sx={{ color: theme.palette.survey.buttonPink }} />
          }
          label="Subscriber"
          isActive={pathname === "/admin/subscriber"}
          onClick={onLinkClick}
        />
        <SidebarLink
          href="/admin/pin"
          icon={
            <Notifications sx={{ color: theme.palette.survey.buttonPink }} />
          }
          label="PIN"
          isActive={pathname === "/admin/pin"}
          onClick={onLinkClick}
        />
        <SidebarLink
          href="/admin/setting"
          icon={
            <SettingsIcon sx={{ color: theme.palette.survey.buttonPink }} />
          }
          label="Settings"
          isActive={pathname === "/admin/setting"}
          onClick={onLinkClick}
        />
        <SidebarLink
          href="/admin/login"
          icon={<LogoutIcon sx={{ color: theme.palette.survey.buttonPink }} />}
          label="Logout"
          isActive={pathname === "#."}
        />
      </List>
    </>
  );
};

export default AdminSidebar;
