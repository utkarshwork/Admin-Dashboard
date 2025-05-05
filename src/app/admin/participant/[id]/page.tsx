"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import {
  StyledContainer,
  StyledRow,
  StyledSettingBox,
  StyledSettingTitle,
  SyledHeadingBox,
  StyledViewField,
  StyledCard,
  StyledCardContent,
  StyledAttHeading,
  StyledTitleBox,
} from "./style";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import TodayIcon from "@mui/icons-material/Today";
import RepeatIcon from "@mui/icons-material/Repeat";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Typography } from "@mui/material";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type Question = {
  question_id: number;
  question: string;
  selected_option: string;
};

type Attempt = {
  attempt: number;
  attempt_date: string;
  questions: Question[];
};

type UserData = {
  id: number;
  name: string;
  email: string;
  isAttempDate: string;
  perDayAttempt: number;
  attemptRemain: number;
  isSubscribed: number;
  status: number;
  attempts: Attempt[];
};

export default function ViewPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("error");
  const [isLoading] = useState(false);

  const userData: UserData = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    isAttempDate: new Date().toISOString(),
    perDayAttempt: 3,
    attemptRemain: 1,
    isSubscribed: 1,
    status: 1,
    attempts: [
      {
        attempt: 1,
        attempt_date: new Date().toISOString(),
        questions: [
          {
            question_id: 101,
            question: "What is your favorite color?",
            selected_option: "Blue",
          },
          {
            question_id: 102,
            question: "What is your hobby?",
            selected_option: "Reading",
          },
        ],
      },
    ],
  };

  const handleCloseAlert = () => setAlertOpen(false);

  return (
    <AdminLayout>
      <StyledSettingBox>
        <SyledHeadingBox>
          <StyledSettingTitle>View User Details</StyledSettingTitle>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAlertMessage("Static export not implemented");
              setAlertSeverity("info");
              setAlertOpen(true);
            }}
            disabled={isLoading}
          >
            Export
          </Button>
        </SyledHeadingBox>

        <StyledContainer>
          <StyledRow>
            <StyledViewField>
              <PersonIcon color="primary" />
              <Typography color="primary">Name:</Typography> {userData.name}
            </StyledViewField>
          </StyledRow>

          <StyledRow>
            <StyledViewField>
              <EmailIcon color="primary" />
              <Typography color="primary">Email:</Typography> {userData.email}
            </StyledViewField>
          </StyledRow>

          <StyledRow>
            <StyledViewField>
              <TodayIcon color="primary" />
              <Typography color="primary">Last Attempt:</Typography>{" "}
              {new Date(userData.isAttempDate).toLocaleString()}
            </StyledViewField>
          </StyledRow>

          <StyledRow>
            <StyledViewField>
              <RepeatIcon color="primary" />
              <Typography color="primary">Attempt:</Typography>{" "}
              {userData.perDayAttempt}
            </StyledViewField>
          </StyledRow>

          <StyledRow>
            <StyledViewField>
              <RepeatIcon color="primary" />
              <Typography color="primary">Remaining Attempt:</Typography>{" "}
              {userData.attemptRemain}
            </StyledViewField>
          </StyledRow>

          <StyledRow>
            <StyledViewField>
              <SubscriptionsIcon color="primary" />
              <Typography color="primary">Subscribed:</Typography>{" "}
              {userData.isSubscribed ? "Yes" : "No"}
            </StyledViewField>
          </StyledRow>

          <StyledRow>
            <StyledViewField>
              <CheckCircleIcon color="primary" />
              <Typography color="primary">Status:</Typography>{" "}
              {userData.status === 1 ? "Active" : "Inactive"}
            </StyledViewField>
          </StyledRow>

          {userData.attempts.map((attemptData) => (
            <StyledCard key={attemptData.attempt} sx={{ marginTop: 2, p: 0 }}>
              <StyledTitleBox>
                <StyledAttHeading
                  variant="h5"
                  fontWeight={"medium"}
                  gutterBottom
                >
                  Survey
                </StyledAttHeading>
                <StyledAttHeading
                  sx={{ m: 0, display: "flex", alignItems: "center", gap: 2 }}
                  gutterBottom
                >
                  <CalendarMonthIcon />{" "}
                  {new Date(attemptData.attempt_date).toLocaleDateString(
                    "en-GB",
                  )}
                </StyledAttHeading>
              </StyledTitleBox>

              {attemptData.questions.map((q, index) => (
                <StyledCardContent key={`${q.question_id}-${index}`}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Q: {q.question}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Selected Answer: {q.selected_option}
                  </Typography>
                </StyledCardContent>
              ))}
            </StyledCard>
          ))}
        </StyledContainer>
      </StyledSettingBox>
      <AlertSnackbar
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleCloseAlert}
      />
    </AdminLayout>
  );
}
