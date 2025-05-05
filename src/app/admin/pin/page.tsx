"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "@/components/layout/admin-layout/AdminLayout";
import { TableWrapper } from "@/components/table-wrapper/table-wrapper";
import { Data } from "./pin.types";
import { TableColumn } from "@/components/table-wrapper/table-wrapper.types";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { AlertSnackbar } from "@/components/layout/AlertSnackbar";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Loader from "@/components/layout/loader/Loader";
import {
  StyledCloseButton,
  StyledDragBox,
  StyledModalBox,
  StyledTypographyLink,
} from "../questions/style";

const STATIC_PINS = [
  {
    id: 1,
    pin: "123456",
    name: "Alice",
    used_date: "2024-05-01",
    status: "Allotted",
  },
  { id: 2, pin: "654321", name: "", used_date: "", status: "Available" },
  {
    id: 3,
    pin: "789012",
    name: "Bob",
    used_date: "2024-04-29",
    status: "Allotted",
  },
  { id: 4, pin: "321098", name: "", used_date: "", status: "Available" },
];

const PinPage = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [pins, setPins] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [pinStatus, setPinStatus] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("error");
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handlePageChange = (event: unknown, newPage: number) =>
    setPage(newPage);

  const handleRowsPerPageChange = (perPage: number, page: number) => {
    setPerPage(perPage);
    setPage(page);
  };

  const handleStatusChange = (value: string) => {
    setPinStatus(value);
    setPage(0);
  };

  const fetchPins = useCallback(() => {
    setIsLoading(true);

    let filtered = STATIC_PINS;

    if (search) {
      filtered = filtered.filter((pin) => pin.pin.includes(search));
    }

    if (pinStatus) {
      filtered = filtered.filter(
        (pin) => pin.status.toLowerCase() === pinStatus.toLowerCase(),
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPins(filtered as any);
    setTotalRecords(filtered.length);
    setIsLoading(false);
  }, [search, pinStatus]);

  useEffect(() => {
    fetchPins();
  }, [fetchPins]);

  const handleDeletePins = (ids: number[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated = pins.filter((pin) => !ids.includes(pin.id as any));
    setPins(updated);
    setSelected([]);
    showAlert("Pins successfully deleted", "success");
  };

  const handleImportClick = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleFileChange = async (file: File) => {
    if (!file || !file.name.endsWith(".csv")) {
      showAlert("Please upload a valid .csv file.", "error");
      return;
    }

    setIsLoading(true);
    setModalOpen(false);

    setTimeout(() => {
      showAlert("Pins imported successfully", "success");
      fetchPins(); // re-fetch to simulate updated list
      setIsLoading(false);
    }, 1500);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/csv": [".csv"] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      } else {
        showAlert(
          "Invalid file type, please upload a valid .csv file.",
          "error",
        );
      }
    },
  });

  const columns: TableColumn[] = [
    {
      id: "pin",
      label: "Pin",
      numeric: false,
      disablePadding: false,
      sortable: true,
    },
    {
      id: "name",
      label: "Participant Name",
      numeric: false,
      disablePadding: false,
      sortable: false,
      render: (row) => row.name || "-",
    },
    {
      id: "used_date",
      label: "Allotted Date",
      numeric: false,
      disablePadding: false,
      sortable: true,
      render: (row) => row.used_date || "-",
    },
    {
      id: "status",
      label: "Status",
      numeric: false,
      disablePadding: false,
      sortable: true,
      render: (row) => formatStatus(row.status),
    },
  ];

  const formatStatus = (value: string) => (
    <span style={{ color: value === "Allotted" ? "green" : "" }}>
      {value === "Allotted" ? "Allotted" : "Available"}
    </span>
  );

  const importBtn = (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleImportClick}
        disabled={isLoading}
      >
        {isLoading ? "Importing..." : "Import"}
      </Button>
    </Box>
  );

  const filter = (
    <Box>
      <FormControl fullWidth>
        <Select
          value={pinStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          size="small"
          displayEmpty
          renderValue={(selected) =>
            !selected ? (
              <Typography>Select Status</Typography>
            ) : (
              selected.charAt(0).toUpperCase() + selected.slice(1)
            )
          }
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="allotted">Allotted</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <AdminLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TableWrapper
            title="Pins"
            columns={columns}
            data={pins}
            page={page}
            perPage={perPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            sort={orderBy}
            sortorder={order}
            sortBy={(field: string, direction: "desc" | "asc") => {
              setOrderBy(field);
              setOrder(direction);
            }}
            search={search}
            searchBy={setSearch}
            selected={selected}
            rowSelected={setSelected}
            modalType="pins"
            onDelete={handleDeletePins}
            importBtn={importBtn}
            isLoading={isLoading}
            filters={filter}
          />

          <AlertSnackbar
            open={alertOpen}
            message={alertMessage}
            severity={alertSeverity}
            onClose={handleCloseAlert}
          />

          <Modal open={modalOpen} onClose={handleModalClose}>
            <StyledModalBox>
              <Typography variant="h6">Import Pins (CSV)</Typography>
              <Typography sx={{ mt: 2 }}>
                Upload a CSV with pins. Drag and drop or click to select a file.
                <br />
                <StyledTypographyLink
                  href="/sample_pin.csv"
                  download
                  component={"a"}
                >
                  Sample CSV
                </StyledTypographyLink>
              </Typography>
              <StyledDragBox {...getRootProps()}>
                <input
                  type="file"
                  accept=".csv"
                  {...getInputProps()}
                  style={{ display: "none" }}
                />
                <InsertDriveFileIcon fontSize="large" sx={{ color: "gray" }} />
                <Typography variant="body2" color="gray">
                  Drag and drop your file here
                </Typography>
              </StyledDragBox>

              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) =>
                  e.target.files && handleFileChange(e.target.files[0])
                }
              />
              <StyledCloseButton
                variant="contained"
                color="error"
                onClick={handleModalClose}
              >
                <CloseIcon />
              </StyledCloseButton>
            </StyledModalBox>
          </Modal>
        </>
      )}
    </AdminLayout>
  );
};

export default PinPage;
