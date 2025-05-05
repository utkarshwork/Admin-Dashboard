import { createTheme } from "@mui/material/styles";
import "./theme.type";

const survey = {
  black: "#000000",
  white: "#FFFFFF",
  gray: "#333",
  mainPink: "#d81b60",
  buttonPink: "#d3006c",
  pink: "#FFE7F0",
  gradDarkPink: "#c5006cb3",
  gradLightPink: "#fb87feb3",
  gradeBlue: "#1940AD",
  gradeLightBlue: "#5FCCF4",
  pinkBorder: "#FE488C",
  textBlue: "#00AAE6",
  textLightBlue: "#00C0DB",
  textPink: "#CD00D6",
  checkBoxColor: "#AD1457",
  boxShadowColor: "#00000040",
  orangeBtnBg: "#f6323c",
  orangeBtnBorder: "#CFCED3",
  dashboardBoxBorder: "#e2e8f0",
  dashboardTitleBorder: "#e2e8f0",
  dashboardDarkBg: "#1c2434",
  success: "#28a745",
  error: "#dc3545",
  warning: "#ffc107",
  danger: "#ff5722",
  tiltCorner: "#660336",
  buttonHover: "#A80057",
  participantsColor: "#d3006c",
  surveysColor: "#444DA1",
  subscribersColor: "#01aadc",
  grayBorder: "#c4c4c4",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d3006c",
      light: "#d3006c",
      contrastText: "#fff",
    },
    success: {
      main: "#28a745",
    },
    error: {
      main: "#dc3545",
    },
    warning: {
      main: "#ffc107",
    },
    danger: {
      main: "#ff5722",
      contrastText: "#fff",
    },
    survey,
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;
