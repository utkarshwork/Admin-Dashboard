import { styled } from "@mui/material";

export const StyledLogInBtn = styled("a")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "800",
  padding: "12px 24px",
  textTransform: "none",
  border: "2px solid #CFCED3",
  borderRadius: "10px",
  boxShadow: "unset",
  backgroundColor: "#fff",
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    border: "2px solid",
    BorderColor: theme.palette.survey["orangeBtnBg"],
    boxShadow: "unset",
  },
  display: "inline-block",
  cursor: "pointer",
}));
