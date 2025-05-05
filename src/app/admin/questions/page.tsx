"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import { TableWrapper } from "@/components/table-wrapper/table-wrapper";
import { TableColumn } from "@/components/table-wrapper/table-wrapper.types";
import { Question } from "./questions.types";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import {
  StyledAddButton,
  StyledCloseButton,
  StyledDragBox,
  StyledModalBox,
  StyledTypographyLink,
} from "./style";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
import { useDropzone } from "react-dropzone";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const columns: TableColumn[] = [
  {
    id: "question",
    label: "Question",
    sortable: true,
    disablePadding: false,
    numeric: false,
  },
  {
    id: "type",
    label: "Type",
    sortable: true,
    disablePadding: false,
    numeric: false,
  },
  {
    id: "status",
    label: "Status",
    sortable: true,
    render: (row) => <span>{row.status === 1 ? "Active" : "Inactive"}</span>,
    disablePadding: false,
    numeric: false,
  },
  {
    id: "sequence",
    label: "Sequence",
    sortable: true,
    disablePadding: false,
    numeric: false,
  },
];

// Static sample data
const staticQuestions: Question[] = [
  {
    id: 1,
    question: "What is your name?",
    type: "checkbox",
    status: 1,
    sequence: 1,
    createdAt: null,
    updatedAt: null,
    metas: [],
  },
  {
    id: 2,
    question: "What is your age?",
    type: "radio",
    status: 0,
    sequence: 2,
    createdAt: null,
    updatedAt: null,
    metas: [],
  },
  {
    id: 3,
    question: "Do you like programming?",
    type: "checkbox",
    status: 1,
    sequence: 3,
    createdAt: null,
    updatedAt: null,
    metas: [],
  },
];

export default function QuestionsPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity] = useState<"error" | "success" | "info" | "warning">(
    "error",
  );
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleAddNewRecord = () => {
    router.push("/admin/questions/add");
  };

  const updateAction = (row: Question) => {
    router.push(`/admin/questions/${row?.id}`);
  };

  const showAlert = (message: string, severity = "error") => {
    setAlertMessage(message);
    setAlertOpen(true);
    console.log(severity);
  };

  const handleCloseAlert = () => setAlertOpen(false);
  const handleModalClose = () => setModalOpen(false);
  const handleImportClick = () => setModalOpen(true);

  const addNewRecord = (
    <StyledAddButton
      variant="contained"
      color="primary"
      onClick={handleAddNewRecord}
      endIcon={<AddIcon />}
    >
      Add
    </StyledAddButton>
  );

  const importBtn = (
    <Box>
      <Button variant="contained" color="primary" onClick={handleImportClick}>
        Import
      </Button>
    </Box>
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/csv": [".csv"] },
    onDrop: () => {
      handleModalClose();
      showAlert("CSV upload is disabled in static mode.", "info");
    },
  });

  return (
    <AdminLayout>
      <TableWrapper
        title="Questions"
        columns={columns}
        data={staticQuestions}
        page={0}
        perPage={staticQuestions.length}
        totalRecords={staticQuestions.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        sort={""}
        sortorder={"asc"}
        sortBy={() => {}}
        search={""}
        searchBy={() => {}}
        selected={selected}
        rowSelected={setSelected}
        modalType="questions"
        onDelete={() => {}}
        addNewRecord={addNewRecord}
        updateRecord={updateAction}
        isLoading={false}
        importBtn={importBtn}
      />
      <AlertSnackbar
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleCloseAlert}
      />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <StyledModalBox>
          <Typography variant="h6">Import Questions (CSV)</Typography>
          <Typography sx={{ mt: 2 }}>
            Upload a CSV file.
            <StyledTypographyLink
              href="#"
              download
              onClick={() => showAlert("Sample CSV download disabled.", "info")}
              component={"a"}
            >
              Sample CSV
            </StyledTypographyLink>
          </Typography>
          <StyledDragBox {...getRootProps()}>
            <input type="file" {...getInputProps()} />
            <InsertDriveFileIcon fontSize="large" sx={{ color: "gray" }} />
            <Typography variant="body2" color="gray">
              Drag and drop your file here
            </Typography>
          </StyledDragBox>
          <StyledCloseButton
            variant="contained"
            color="error"
            onClick={handleModalClose}
          >
            <CloseIcon />
          </StyledCloseButton>
        </StyledModalBox>
      </Modal>
    </AdminLayout>
  );
}
