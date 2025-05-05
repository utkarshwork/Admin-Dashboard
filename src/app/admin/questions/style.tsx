import {
  Box,
  Button,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";

export const StyledAddButton = styled(Button)(() => ({
  alignItems: "center",
  padding: "7px 30px",
}));

export const StyledModalBox = styled(Box)(({ theme }) => ({
  width: "650px",
  backgroundColor: theme.palette.survey["white"],
  padding: "32px",
  borderRadius: "28px",
  textAlign: "center",
  margin: "auto",
  marginTop: "14%",
  position: "relative",

  [theme.breakpoints.down(1399)]: {
    marginTop: "8%",
  },
}));

export const StyledDragBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.survey.gray}`,
  borderRadius: "16px",
  padding: "20px",
  marginTop: "24px",
  cursor: "pointer",
  minHeight: "170px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
}));

export const StyledCloseButton = styled(Button)(({ theme }) => ({
  padding: 0,
  width: "40px",
  height: "40px",
  minWidth: "40px",
  position: "absolute",
  top: "20px",
  right: "20px",
  backgroundColor: "unset",
  boxShadow: "unset",

  "& svg": {
    fill: theme.palette.survey.black,
  },
  "&:hover": {
    boxShadow: "unset",
    "& svg": {
      fill: theme.palette.survey.error,
    },
  },
}));

export const StyledModalParagraph = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "16px",
  "& a": {
    marginLeft: "8px",
  },
}));

type StyledTypographyLinkProps = TypographyProps<"a", { component: "a" }>;

export const StyledTypographyLink = styled(
  (props: StyledTypographyLinkProps) => <Typography {...props} />,
)(({ theme }) => ({
  color: "blue",
  display: "inline-block",
  marginTop: theme.spacing(2),
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));
