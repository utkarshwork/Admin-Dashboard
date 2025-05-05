"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

export default function GradientCircularProgress() {
  const theme = useTheme();

  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient
            id="gradient-stroke"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={theme.palette.survey.gradDarkPink} />
            <stop
              offset="100%"
              stopColor={theme.palette.survey.gradeLightBlue}
            />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgress
        thickness={5}
        size={60}
        sx={{
          "svg circle": {
            stroke: "url(#gradient-stroke)",
          },
        }}
      />
    </>
  );
}
