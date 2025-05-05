import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledSettingBox = styled(Box)(({ theme }) => ({
  background: theme.palette.survey["white"],
  boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
  borderRadius: "32px",
  height: "100%",
  padding: "32px",
  marginBottom: "30px",
}));

export const StyledContainer = styled(Box)(() => ({
  marginTop: "20px",
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
}));

export const StyledRow = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "32.5%",
  },
}));

export const SyledHeadingBox = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: "16px",
  borderBottom: "1px solid",
  borderColor: theme.palette.survey["dashboardBoxBorder"],
}));

export const StyledSettingTitle = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "bold",
}));

export const StyledViewField = styled(Box)(({ theme }) => ({
  padding: "14px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: 500,
  color: theme.palette.survey["black"],
  border: "1px solid",
  borderColor: theme.palette.survey["grayBorder"],
  gap: "12px",
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "20px",
  width: "100%",
  marginTop: 4,
  padding: 2,
  border: "1px solid",
  borderColor: theme.palette.survey["grayBorder"],
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  borderBottom: "1px solid",
  borderColor: theme.palette.survey["dashboardBoxBorder"],
  "&:last-child": {
    borderBottom: "unset",
  },
}));

export const StyledAttHeading = styled(Typography)(() => ({
  padding: "0px 16px",
}));

export const StyledTitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.survey["dashboardDarkBg"],
  color: theme.palette.survey["white"],
  padding: "16px",
  borderRadius: "20px 20px 0px 0px",
}));
