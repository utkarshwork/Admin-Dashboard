"use client";

import React, { useState } from "react";
import { MenuItem, Select, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
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
} from "../[id]/style";
import Link from "next/link";

export default function QuestionForm() {
  const [questionType, setQuestionType] = useState("checkbox");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("error");
  const [answerErrors, setAnswerErrors] = useState<string[]>([]);
  const [questionError] = useState("");
  const [sequence, setSequence] = useState<number>(1);
  const [sequenceError] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

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
    setDeleteIndex(index); // Store index to delete
    setOpenDeleteDialog(true); // Open confirmation dialog
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers.splice(deleteIndex, 1);
      setAnswers(updatedAnswers);

      const updatedErrors = [...answerErrors];
      updatedErrors.splice(deleteIndex, 1);
      setAnswerErrors(updatedErrors);
    }
    setDeleteIndex(null); // Reset delete index
    setOpenDeleteDialog(false); // Close dialog
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
    setOpenDeleteDialog(false);
  };

  return (
    <AdminLayout>
      <StyledSettingBox>
        <SyledHeadingBox>
          <StyledSettingTitle>Create Question</StyledSettingTitle>
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
                label="Question Type"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                fullWidth
                displayEmpty
                labelId="question-type-label"
                id="question-type"
                sx={{
                  "& legend": {
                    top: "-8px",
                    overflow: "unset",
                    position: "relative",
                    color: "#747774", // default color
                  },
                  "&.Mui-focused legend": {
                    color: (theme) => theme.palette.primary.main, // on focus, use primary
                  },
                  "& fieldset legend span": {
                    opacity: 1,
                    fontSize: "0.75rem",
                  },
                }}
              >
                <MenuItem value="checkbox">Checkbox</MenuItem>
                <MenuItem value="radio">Radio</MenuItem>
              </Select>
            </StyledFeildRow>

            <StyledFeildRow>
              <TextField
                label="Sequence"
                value={sequence === 0 ? "" : sequence}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0 || e.target.value === "") {
                    setSequence(value);
                  }
                }}
                type="number"
                inputProps={{ min: 1 }}
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
                      onClick={() => removeAnswer(index)}
                    >
                      <DeleteIcon
                        sx={{
                          cursor: "pointer",
                          color: "danger",
                        }}
                      />
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
            Submit
          </StyledSubmitButton>
        </Link>
      </StyledSettingBox>

      {/* Updated Delete Confirmation Dialog */}
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
