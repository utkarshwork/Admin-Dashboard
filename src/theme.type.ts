// theme.type.ts
import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    survey: {
      black: string;
      white: string;
      gray: string;
      mainPink: string;
      buttonPink: string;
      pink: string;
      gradDarkPink: string;
      gradLightPink: string;
      gradeBlue: string;
      gradeLightBlue: string;
      pinkBorder: string;
      textBlue: string;
      textLightBlue: string;
      textPink: string;
      checkBoxColor: string;
      boxShadowColor: string;
      orangeBtnBg: string;
      orangeBtnBorder: string;
      dashboardBoxBorder: string;
      dashboardTitleBorder: string;
      dashboardDarkBg: string;
      success: string;
      error: string;
      warning: string;
      danger: string;
      tiltCorner: string;
      buttonHover: string;
      participantsColor: string;
      surveysColor: string;
      subscribersColor: string;
      grayBorder: string;
    };
    danger: Palette["primary"]; // ✅ add danger in Palette
  }

  interface PaletteOptions {
    survey?: {
      black: string;
      white: string;
      gray: string;
      mainPink: string;
      buttonPink: string;
      pink: string;
      gradDarkPink: string;
      gradLightPink: string;
      gradeBlue: string;
      gradeLightBlue: string;
      pinkBorder: string;
      textBlue: string;
      textLightBlue: string;
      textPink: string;
      checkBoxColor: string;
      boxShadowColor: string;
      orangeBtnBg: string;
      orangeBtnBorder: string;
      dashboardBoxBorder: string;
      dashboardTitleBorder: string;
      dashboardDarkBg: string;
      success: string;
      error: string;
      warning: string;
      danger: string;
      tiltCorner: string;
      buttonHover: string;
      participantsColor: string;
      surveysColor: string;
      subscribersColor: string;
      grayBorder: string;
    };
    danger?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    danger: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    danger: true;
  }
}

declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    danger: true;
  }
}

createTheme();
