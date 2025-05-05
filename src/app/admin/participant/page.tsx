"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import { TableWrapper } from "@/components/table-wrapper/table-wrapper";
import { Data } from "./participant.types";
import { TableColumn } from "@/components/table-wrapper/table-wrapper.types";
import { Button } from "@mui/material";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
import { useRouter } from "next/navigation";

const columns: TableColumn[] = [
  {
    id: "name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "perDayAttempt",
    label: "Per Day Attempt",
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "isSubscribed",
    label: "Subscribed",
    numeric: false,
    disablePadding: false,
    sortable: true,
    render: (row) => <span>{row.isSubscribed === 1 ? "Yes" : "No"}</span>,
  },
];

const staticParticipants = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    perDayAttempt: 2,
    isSubscribed: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    perDayAttempt: 3,
    isSubscribed: 0,
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    perDayAttempt: 1,
    isSubscribed: 1,
  },
];

export default function ParticipantPage() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("error");
  const router = useRouter();

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

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (perPage: number, page: number) => {
    setPerPage(perPage);
    setPage(page);
  };

  const viewAction = (row: Data) => {
    router.push(`participant/${row?.id}`);
  };

  const handleDeleteParticipants = () => {
    showAlert("Delete is disabled in static mode.", "info");
  };

  const importBtn = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => showAlert("Export is disabled in static mode.", "info")}
    >
      Export
    </Button>
  );

  return (
    <AdminLayout>
      <TableWrapper
        title="Participants"
        columns={columns}
        data={staticParticipants}
        page={page}
        perPage={perPage}
        totalRecords={staticParticipants.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        search={search}
        searchBy={(query) => setSearch(query)}
        selected={selected}
        rowSelected={setSelected}
        viewAction={viewAction}
        onDelete={handleDeleteParticipants}
        isLoading={false}
        importBtn={importBtn}
      />

      <AlertSnackbar
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleCloseAlert}
      />
    </AdminLayout>
  );
}
