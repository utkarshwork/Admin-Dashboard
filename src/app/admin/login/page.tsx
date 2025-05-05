"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import Image from "next/image";
import {
  StyledForgotBox,
  StyledFormBox,
  StyledHeading,
  StyledLeftBox,
  StyledLeftContent,
  StyledRightBox,
  StyledSignInButton,
  StyledSubtext,
  StyledText,
  StyledTextField,
  StyledWrapper,
} from "./style";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading] = useState(false);
  const [emailError] = useState("");
  const [passwordError] = useState("");
  const [generalError] = useState("");
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState(false);
  const searchParams = useSearchParams();
  const [alertMessage, setAlertMessage] = useState(
    searchParams.get("message") || "",
  );
  const statusParam = searchParams.get("status") as
    | "error"
    | "success"
    | "info"
    | "warning"
    | null;
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >(statusParam ?? "error");
  const showAlert = (
    message: string,
    severity: "error" | "success" | "info" | "warning" = "error",
  ) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };
  const handleCloseAlert = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("message");
    params.delete("status");
    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "");
    router.replace(newUrl);
    setAlertOpen(false);
    setAlertMessage("");
  };
  useEffect(() => {
    showAlert(alertMessage, alertSeverity);
  }, [alertOpen]);

  return (
    <StyledWrapper>
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
      <StyledRightBox>
        <StyledFormBox>
          <StyledHeading variant="h4">Login</StyledHeading>
          <StyledSubtext variant="body1">
            Fill in the fields below to login to your account
          </StyledSubtext>
          <StyledTextField
            fullWidth
            label="Email Address"
            variant="outlined"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <StyledTextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {generalError && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 2, textAlign: "left" }}
            >
              {generalError}
            </Typography>
          )}
          <Link href="/admin/dashboard" passHref>
            <StyledSignInButton fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Sign in"}
            </StyledSignInButton>
          </Link>

          <StyledForgotBox>
            <Link href="login/forgot-password">
              <StyledText>Forgot Password?</StyledText>
            </Link>
          </StyledForgotBox>
        </StyledFormBox>
      </StyledRightBox>
      {alertMessage && (
        <AlertSnackbar
          open={alertOpen}
          message={alertMessage}
          severity={alertSeverity}
          onClose={handleCloseAlert}
        />
      )}
    </StyledWrapper>
  );
};

export default LoginPage;
