"use client";

import React, { useState } from "react";
import { Typography, InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";
import Image from "next/image";
import {
  StyledFormBox,
  StyledHeading,
  StyledLeftBox,
  StyledLeftContent,
  StyledRightBox,
  StyledSignInButton,
  StyledSubtext,
  StyledTextField,
  StyledWrapper,
} from "../style";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [isError] = useState(false);
  const [loading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("error");

  const showAlert = (
    message: string,
    severity: "error" | "success" | "info" | "warning" = "error",
  ) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  console.log(showAlert);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
    setMessage("");
  };

  return (
    <StyledWrapper>
      {/* Left side - Branding */}
      <StyledLeftBox>
        <StyledLeftContent>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Welcome to
          </Typography>
          <Image src="/assets/logo.png" alt="Logo" width={200} height={140} />
          <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
            Your Voice Matters — Let’s Shape the Future Together!
          </Typography>
        </StyledLeftContent>
      </StyledLeftBox>

      {/* Right side - Login Form */}
      <StyledRightBox>
        <StyledFormBox>
          <StyledHeading variant="h4">Forgot Password</StyledHeading>
          <StyledSubtext variant="body1">
            Enter your email and we will send you a link to reset your password.
          </StyledSubtext>
          <StyledTextField
            fullWidth
            label="Email Address"
            variant="outlined"
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Link href="/admin/login/reset-password" passHref>
            <StyledSignInButton fullWidth disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </StyledSignInButton>
          </Link>

          {message && (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                textAlign: "center",
                color: isError ? "error.main" : "success.main",
              }}
            >
              {message}
            </Typography>
          )}
        </StyledFormBox>
      </StyledRightBox>
      <AlertSnackbar
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleCloseAlert}
      />
    </StyledWrapper>
  );
};

export default ForgotPassword;
