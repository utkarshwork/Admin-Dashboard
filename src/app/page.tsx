"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import FrontendLayout from "@/components/layout/frontend-layout/FrontendLayout";
import Link from "next/link";
import { StyledSignInButton } from "./admin/login/style";

const Homepage = () => {
  const [isLoading] = useState<boolean>(false);

  return (
    <FrontendLayout>
      <Link href="/admin/login" passHref>
        <StyledSignInButton fullWidth disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            "Click Here To Go To The Dashboard"
          )}
        </StyledSignInButton>
      </Link>
    </FrontendLayout>
  );
};

export default Homepage;
