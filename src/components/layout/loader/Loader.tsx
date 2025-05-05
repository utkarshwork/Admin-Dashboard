"use client";

import Image from "next/image";
import { Box } from "@mui/material";
import GradientCircularProgress from "./GradientCircularProgress";

const Loader = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Image src="/assets/logo.png" alt="Logo" width={120} height={80} />
      <Box mt={4}>
        <GradientCircularProgress />
      </Box>
    </Box>
  );
};

export default Loader;
