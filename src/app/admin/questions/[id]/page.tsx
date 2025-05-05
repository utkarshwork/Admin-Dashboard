"use client";

import React, { useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import {
  StyledAddButton,
  StyledAnsBox,
  StyledAnsField,
  StyledDeleteButton,
  StyledFeildRow,
  StyledField,
  StyledFlexBox,
  StyledQueBox,
  StyledRightRow,
  StyledSettingBox,
  StyledSettingTitle,
  StyledSubmitButton,
  SyledHeadingBox,
} from "./style";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
import Link from "next/link";

export default function QuestionDetailsPage() {
  const [questionType, setQuestionType] = useState("checkbox");
  const [question, setQuestion] = useState("What is your favorite color?");
  const [answers, setAnswers] = useState<string[]>(["Red", "Blue", "Green"]);
  const [sequence, setSequence] = useState<number>(1);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("success");

  const [answerErrors, setAnswerErrors] = useState<string[]>([]);
  const [questionError, ] = useState("");
  const [sequenceError, ] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const showAlert = (
    message: string,
    severity: "error" | "success" | "info" | "warning" = "success",
  ) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  console.log(showAlert);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);

    const updatedErrors = [...answerErrors];
    if (value.trim() !== "") {
      updatedErrors[index] = "";
    }
    setAnswerErrors(updatedErrors);
  };

  const addAnswer = () => {
    setAnswers([...answers, ""]);
    setAnswerErrors([...answerErrors, ""]);
  };

  const removeAnswer = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers.splice(index, 1);
    setAnswers(updatedAnswers);

    const updatedErrors = [...answerErrors];
    updatedErrors.splice(index, 1);
    setAnswerErrors(updatedErrors);
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      removeAnswer(deleteIndex);
    }
    setOpenDeleteDialog(false);
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setDeleteIndex(null);
  };

  return (
    <AdminLayout>
      <StyledSettingBox>
        <SyledHeadingBox>
          <StyledSettingTitle>Update Question</StyledSettingTitle>
        </SyledHeadingBox>

        <StyledQueBox>
          <StyledFeildRow>
            <StyledField
              label="Question Title"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              fullWidth
              error={!!questionError}
              helperText={questionError}
            />
          </StyledFeildRow>

          <StyledFlexBox>
            <StyledFeildRow>
              <Select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                fullWidth
              >
                <MenuItem value="checkbox">Checkbox</MenuItem>
                <MenuItem value="radio">Radio</MenuItem>
              </Select>
            </StyledFeildRow>

            <StyledFeildRow>
              <TextField
                label="Sequence"
                type="number"
                inputProps={{ min: 1 }}
                value={sequence === 0 ? "" : sequence}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0 || e.target.value === "") {
                    setSequence(value);
                  }
                }}
                fullWidth
                error={!!sequenceError}
                helperText={sequenceError}
              />
            </StyledFeildRow>
          </StyledFlexBox>

          <StyledAnsBox>
            <StyledFeildRow sx={{ flexDirection: "column", gap: 2 }}>
              {answers.map((answer, index) => (
                <StyledAnsField key={index}>
                  <StyledField
                    label={`Option ${index + 1}`}
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    fullWidth
                    error={!!answerErrors[index]}
                    helperText={answerErrors[index]}
                  />
                  {answers.length > 1 && (
                    <StyledDeleteButton
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(index)}
                    >
                      <DeleteIcon />
                    </StyledDeleteButton>
                  )}
                </StyledAnsField>
              ))}
            </StyledFeildRow>

            <StyledRightRow>
              <StyledAddButton
                variant="contained"
                onClick={addAnswer}
                fullWidth
              >
                <AddIcon />
              </StyledAddButton>
            </StyledRightRow>
          </StyledAnsBox>
        </StyledQueBox>

        <Link href="/admin/questions" passHref>
          <StyledSubmitButton variant="contained" color="primary">
            Update
          </StyledSubmitButton>
        </Link>
      </StyledSettingBox>

      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this option?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCancelDelete} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AlertSnackbar
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleCloseAlert}
      />
    </AdminLayout>
  );
}
