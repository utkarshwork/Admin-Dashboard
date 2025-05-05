import { AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, styled } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export const StyledHeaderBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
}));

export const StyledInnerHeaderBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const StyledAccountCircleIcon = styled(AccountCircle)(({ theme }) => ({
  color: theme.palette.survey["buttonPink"],
  fontSize: "30px",
  marginRight: "10px",
}));

export const StyledPersonIcon = styled(PersonIcon)(({ theme }) => ({
  color: theme.palette.survey["buttonPink"],
  fontSize: "20px",
  marginRight: "10px",
}));

export const StyledSettingIcon = styled(SettingsIcon)(({ theme }) => ({
  color: theme.palette.survey["buttonPink"],
}));

export const StyledLogoutIcon = styled(LogoutIcon)(({ theme }) => ({
  color: theme.palette.survey["buttonPink"],
}));

// Sidebar ---------------------
export const StyledLogoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px 16px",
}));
