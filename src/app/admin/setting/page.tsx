"use client";

import { useState } from "react";
import { Box, Button, Typography, Switch } from "@mui/material";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import {
  StyledContainer,
  StyledField,
  Styledlabel,
  StyledRow,
  FullRow,
  StyledSettingBox,
  StyledSettingTitle,
  StyledSubmitButton,
  SyledHeadingBox,
  StyledUploadButton,
} from "./style";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";

export default function Setting() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    footerNote: "",
    maxOut: 0,
    perdaymaxOut: 0,
    logo: "",
    favicon: "",
    issuerUrl: "",
    redirectUri: "",
    clientId: "",
    isLive: "",
  });

  const [errors] = useState({
    title: "",
    description: "",
    footerNote: "",
    maxOut: "",
    perdaymaxOut: "",
    issuerUrl: "",
    redirectUri: "",
    clientId: "",
  });

  const [fileUploads, setFileUploads] = useState({
    logo: null as File | null,
    favicon: null as File | null,
  });

  const [isSubmitting] = useState(false);
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

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFileChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const allowedExtensions = ["jpg", "jpeg", "png", "ico", "webp"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        showAlert(
          `Only image files are allowed: ${allowedExtensions.join(", ")}`,
          "error",
        );
        e.target.value = "";
        return;
      }

      setFileUploads((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  const handleRemoveFile = (field: string) => {
    setFileUploads((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const handleToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ): void => {
    handleInputChange("isLive", checked ? "true" : "false");
  };

  return (
    <AdminLayout>
      <StyledSettingBox>
        <Box>
          <SyledHeadingBox>
            <StyledSettingTitle>Settings</StyledSettingTitle>
          </SyledHeadingBox>
          <StyledContainer sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <StyledRow>
              <StyledField
                label="Title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                fullWidth
                error={!!errors.title}
                helperText={errors.title}
              />
            </StyledRow>

            <StyledRow>
              <StyledField
                label="Description"
                type="text"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                fullWidth
                error={!!errors.description}
                helperText={errors.description}
              />
            </StyledRow>

            <StyledRow>
              <StyledField
                label="Overall Limit"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.maxOut}
                onChange={(e) =>
                  handleInputChange("maxOut", Number(e.target.value))
                }
                fullWidth
                error={!!errors.maxOut}
                helperText={errors.maxOut}
              />
            </StyledRow>

            <StyledRow>
              <StyledField
                label="Per Day Limit"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.perdaymaxOut}
                onChange={(e) =>
                  handleInputChange("perdaymaxOut", Number(e.target.value))
                }
                fullWidth
                error={!!errors.perdaymaxOut}
                helperText={errors.perdaymaxOut}
              />
            </StyledRow>

            <FullRow>
              <StyledField
                label="Footer Note"
                type="text"
                value={formData.footerNote}
                onChange={(e) =>
                  handleInputChange("footerNote", e.target.value)
                }
                fullWidth
                error={!!errors.footerNote}
                helperText={errors.footerNote}
              />
            </FullRow>

            <StyledRow>
              <input
                type="file"
                id="logo-input"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange("logo", e)}
                accept="image/*"
              />
              <Styledlabel htmlFor="logo-input">
                <StyledUploadButton
                  component="span"
                  fullWidth
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Logo
                </StyledUploadButton>
              </Styledlabel>
              {formData.logo && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_PATH}${formData.logo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_PATH}${formData.logo}`}
                      alt={formData.logo ? formData.logo : "logo"}
                      width={100}
                      height={100}
                      style={{ width: "50%", height: "auto" }}
                    />
                  </a>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveFile("logo")}
                    sx={{ ml: 2, display: "none" }}
                  >
                    {fileUploads.logo ? "Cancel" : "Remove"}
                  </Button>
                </Typography>
              )}
            </StyledRow>

            <StyledRow>
              <input
                type="file"
                id="favicon-input"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange("favicon", e)}
                accept="image/*"
              />
              <Styledlabel htmlFor="favicon-input">
                <StyledUploadButton
                  component="span"
                  fullWidth
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Favicon
                </StyledUploadButton>
              </Styledlabel>
              {formData.favicon && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_PATH}${formData.favicon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_PATH}${formData.favicon}`}
                      alt={formData.favicon ? formData.favicon : "favicon"}
                      width={100}
                      height={100}
                      style={{ width: "50%", height: "auto" }}
                    />
                  </a>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveFile("favicon")}
                    sx={{ ml: 2, display: "none" }}
                  >
                    {fileUploads.favicon ? "Cancel" : "Remove"}
                  </Button>
                </Typography>
              )}
            </StyledRow>
          </StyledContainer>
        </Box>

        <Box>
          <SyledHeadingBox>
            <StyledSettingTitle>
              Singpass Environment Variable
            </StyledSettingTitle>
            <Box>
              Test{" "}
              <Switch
                checked={formData.isLive === "true"}
                onChange={handleToggle}
              />{" "}
              Live
            </Box>
          </SyledHeadingBox>
          <StyledContainer sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <StyledRow>
              <StyledField
                label="ISSUER_URL"
                type="text"
                value={formData.issuerUrl}
                onChange={(e) => handleInputChange("issuerUrl", e.target.value)}
                fullWidth
                error={!!errors.issuerUrl}
                helperText={errors.issuerUrl}
              />
            </StyledRow>
            <StyledRow>
              <StyledField
                label="REDIRECT_URI"
                type="text"
                value={formData.redirectUri}
                onChange={(e) =>
                  handleInputChange("redirectUri", e.target.value)
                }
                fullWidth
                error={!!errors.redirectUri}
                helperText={errors.redirectUri}
              />
            </StyledRow>
            <StyledRow>
              <StyledField
                label="CLIENT_ID"
                type="text"
                value={formData.clientId}
                onChange={(e) => handleInputChange("clientId", e.target.value)}
                fullWidth
                error={!!errors.clientId}
                helperText={errors.clientId}
              />
            </StyledRow>
          </StyledContainer>
        </Box>

        <StyledSubmitButton
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
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
