import {
  Box,
  Typography,
  TextField,
  IconButton,
  styled,
  Button,
} from "@mui/material";
import Link from "next/link";

export const StyledWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  height: "100vh",
}));

export const StyledLeftBox = styled(Box)(() => ({
  flex: "1 1 60%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  color: "white",
  padding: "32px",
  backgroundImage: 'url("/assets/login-bg.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    zIndex: 1,
  },
}));

export const StyledLeftContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 800,
  position: "relative",
  zIndex: 2,
}));

export const StyledRightBox = styled(Box)(() => ({
  flex: "1 1 40%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 32,
  background: "linear-gradient(-45deg, #DC96BC, #EEC7F1, #CFEAEF, #D4DCED)",
  backgroundSize: "400% 400%",
  animation: "gradientShift 10s ease infinite",
  "@keyframes gradientShift": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
}));

export const StyledFormBox = styled(Box)(() => ({
  maxWidth: "500px",
  width: "100%",
  backgroundColor: "white",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
}));

export const StyledHeading = styled(Typography)(() => ({
  marginBottom: "16px",
  fontWeight: "bold",
}));

export const StyledSubtext = styled(Typography)(() => ({
  marginBottom: "32px",
}));

export const StyledTextField = styled(TextField)(() => ({
  marginBottom: "24px",
}));

export const StyledText = styled("span")(({ theme }) => ({
  color: theme.palette.primary["main"],
  fontSize: "0.875rem",
  textDecoration: "none",
  display: "inline-block",
  textAlign: "right",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const StyledForgotBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "24px",
}));

export const StyledVisibilityIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary["main"],
}));

export const StyledSignInButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px 0",
  backgroundColor: theme.palette.primary["main"],
  color: theme.palette.survey["white"],
  borderRadius: "4px",
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: theme.palette.survey["buttonHover"],
  },
}));

export const StyledBtnLink = styled(Link)(({ theme }) => ({
  width: "100%",
  display: "block",
  textAlign: "center",
  textDecoration: "none",
  padding: "12px 0",
  backgroundColor: theme.palette.primary["main"],
  color: theme.palette.survey["white"],
  borderRadius: "4px",
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: theme.palette.survey["buttonHover"],
  },
}));
