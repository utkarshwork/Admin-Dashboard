"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import {
  StyledContainer,
  StyledField,
  StyledRow,
  StyledSettingBox,
  StyledSettingTitle,
  StyledSubmitButton,
  SyledHeadingBox,
  SyledHeadingBoxtwo,
  StyledPassTitle,
} from "../setting/style";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";

export default function Setting() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (
      formData.oldPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (!formData.oldPassword.trim()) {
        newErrors.oldPassword = "Current password is required";
        isValid = false;
      }

      if (!formData.newPassword.trim()) {
        newErrors.newPassword = "New password is required";
        isValid = false;
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
        isValid = false;
      }

      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      showAlert("Please correct the errors in the form", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      showAlert("Profile updated successfully", "success");
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AdminLayout>
      <StyledSettingBox>
        <Box>
          <SyledHeadingBox>
            <StyledSettingTitle>Admin Profile</StyledSettingTitle>
          </SyledHeadingBox>
          <StyledContainer sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <StyledRow>
              <StyledField
                label="Name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
              />
            </StyledRow>

            <StyledRow>
              <StyledField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </StyledRow>
          </StyledContainer>
        </Box>

        <Box>
          <SyledHeadingBoxtwo>
            <StyledPassTitle>Change Password</StyledPassTitle>
            <Box fontSize={"small"}>
              Leave blank to keep the current password.
            </Box>
          </SyledHeadingBoxtwo>
          <StyledContainer sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <StyledRow>
              <StyledField
                label="Current Password"
                type="password"
                value={formData.oldPassword}
                onChange={(e) =>
                  handleInputChange("oldPassword", e.target.value)
                }
                fullWidth
                error={!!errors.oldPassword}
                helperText={errors.oldPassword}
              />
            </StyledRow>
            <StyledRow>
              <StyledField
                label="New Password"
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                fullWidth
                error={!!errors.newPassword}
                helperText={errors.newPassword}
              />
            </StyledRow>
            <StyledRow>
              <StyledField
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </StyledRow>
          </StyledContainer>
        </Box>

        <StyledSubmitButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </StyledSubmitButton>

        <AlertSnackbar
          open={alertOpen}
          message={alertMessage}
          severity={alertSeverity}
          onClose={handleCloseAlert}
        />
      </StyledSettingBox>
    </AdminLayout>
  );
}
