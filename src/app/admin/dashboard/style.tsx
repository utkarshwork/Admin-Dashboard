import { Box, styled, Typography } from "@mui/material";
import Link from "next/link";

interface StyledIconBoxProps {
  bg: string;
}

export const StyledDashboardBox = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "30px",
  width: "100%",
}));

export const StyledIconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bg",
})<StyledIconBoxProps>(({ bg }) => ({
  background: bg,
  minHeight: "200px",
  padding: "35px 32px",
  position: "relative",
  boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  borderRadius: "20px",
}));

export const StyledIconBoxTitle = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "bold",
  position: "relative",
  zIndex: 0,
}));

export const StyledIconBoxCount = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.survey["buttonPink"],
  fontSize: "30px",
  display: "inline-block",
  padding: "10px 20px 10px 50px",
  borderRadius: "0px 30px 30px 0px",
  position: "absolute",
  left: "-44px",
  bottom: "0px",
  color: theme.palette.survey["white"],
  width: "100%",
  overflow: "hidden",
  zIndex: 1,
}));

export const StyledCountBox = styled(Box)(() => ({
  position: "relative",
  width: "75%",
  height: "100%",
}));

export const StyledCorner = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "-11px",
  left: "-44px",
  width: 0,
  height: 0,
  borderLeft: "12px solid transparent",
  borderRight: "0px solid transparent",
  borderTop: `11px solid ${theme.palette.survey?.tiltCorner}`,
  zIndex: 0,
}));

export const StyledleadBox = styled(Box)(() => ({
  marginTop: "48px",
  display: "flex",
  justifyContent: "space-between",
  gap: "32px",
  width: "100%",
}));

export const StyledLeftBox = styled(Box)(({ theme }) => ({
  width: "40%",
  background: theme.palette.survey["white"],
  position: "relative",
  border: "1px solid",
  borderColor: theme.palette.survey["dashboardBoxBorder"],
  boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
}));

export const StyledRightBox = styled(Box)(({ theme }) => ({
  width: "60%",
  background: theme.palette.survey["white"],
  position: "relative",
  border: "1px solid",
  borderColor: theme.palette.survey["dashboardBoxBorder"],
  boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  overflow: "hidden",
}));

export const StyledleftBoxTitle = styled(Typography)(({ theme }) => ({
  padding: "16px 32px",
  borderBottom: "1px solid",
  borderColor: theme.palette.survey["dashboardTitleBorder"],
}));

export const StyledViewLink = styled(Link)(({ theme }) => ({
  color: theme.palette.survey["black"],
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const StyledPieBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  padding: "32px",
}));
