"use client";

import React, { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Typography, InputAdornment } from "@mui/material";
import { Lock } from "@mui/icons-material";
import Image from "next/image";
import {
  StyledLeftBox,
  StyledLeftContent,
  StyledRightBox,
  StyledFormBox,
  StyledHeading,
  StyledSubtext,
  StyledTextField,
  StyledWrapper,
  StyledSignInButton,
} from "../style";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
import Link from "next/link";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("error");

  const showAlert = useCallback(
    (
      message: string,
      severity: "error" | "success" | "info" | "warning" = "error",
    ) => {
      setAlertMessage(message);
      setAlertSeverity(severity);
      setAlertOpen(true);
      router.push(`/admin/login?message=${message}&status=${severity}`);
    },
    [router],
  );

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const validate = () => {
    let valid = true;
    setPasswordError("");
    setConfirmPasswordError("");
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("The passwords you entered do not match.");
      valid = false;
    }
    return valid;
  };

  const handleResetPassword = async () => {
    if (!validate() || !token) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/auth/reset-password?token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        showAlert("Password reset successful.", "success");
        setIsError(false);
        setPassword("");
        setConfirmPassword("");
        router.push("/admin/login");
      } else {
        showAlert(data.message || "Reset failed.", "error");
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      showAlert("Something went wrong.", "error");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  console.log(message);
  console.log(isError);
  return (
    <StyledWrapper>
      <StyledLeftBox>
        <StyledLeftContent>
          <Typography variant="h3">Welcome to</Typography>
          <Image src="/assets/logo.png" alt="Logo" width={200} height={140} />
          <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
            Your Voice Matters — Let’s Shape the Future Together!
          </Typography>
        </StyledLeftContent>
      </StyledLeftBox>

      <StyledRightBox>
        <StyledFormBox>
          <StyledHeading variant="h4">Reset Password</StyledHeading>
          <StyledSubtext variant="body1">
            Enter your new password below.
          </StyledSubtext>

          <StyledTextField
            fullWidth
            type="password"
            label="New Password"
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
            }}
          />

          <StyledTextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Link href="/admin/login" passHref>
            <StyledSignInButton
              onClick={handleResetPassword}
              fullWidth
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </StyledSignInButton>
          </Link>
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

export default ResetPassword;
