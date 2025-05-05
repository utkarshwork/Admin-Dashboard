"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Toolbar,
  Typography,
  Tooltip,
  TableSortLabel,
  Button,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  StyledTableCell,
  StyledTableHeadRow,
  StyledTableRow,
} from "./table-wrapper/style";
import { StyledViewLink } from "@/app/admin/dashboard/style";

interface Data {
  id: number;
  name: string;
  email: string;
  attempt_remain: string;
  attempt: string;
  status: string;
}

const staticData: Data[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    attempt: "2",
    attempt_remain: "1",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    attempt: "3",
    attempt_remain: "0",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    attempt: "1",
    attempt_remain: "2",
    status: "Active",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice@example.com",
    attempt: "1",
    attempt_remain: "2",
    status: "Active",
  },
  {
    id: 5,
    name: "Alice Johnson",
    email: "alice@example.com",
    attempt: "1",
    attempt_remain: "2",
    status: "Active",
  },
];

const headCells = [
  { id: "name", label: "Users" },
  { id: "email", label: "Email" },
  { id: "attempt", label: "Attempt" },
  { id: "attempt_remain", label: "Remaining Attempt" },
  { id: "id", label: "View" },
];

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof Data>(
  order: Order,
  orderBy: Key,
): (a: Data, b: Data) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        py: 1.5,
        justifyContent: "space-between",
        borderBottom: "1px solid #ccd5e1",
      }}
    >
      <Typography variant="h6" fontWeight="bold" component="div">
        Recent Participants
      </Typography>
      <Tooltip title="View">
        <span>
          <StyledViewLink href="/admin/participant" passHref>
            View All
          </StyledViewLink>
        </span>
      </Tooltip>
    </Toolbar>
  );
}

export default function DashboardTable() {
  const router = useRouter();
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(
    () => [...staticData].sort(getComparator(order, orderBy)),
    [order, orderBy],
  );

  const viewAction = (row: Data) => {
    router.push(`participant/${row.id}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <StyledTableHeadRow>
                {headCells.map((headCell) => (
                  <StyledTableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ backgroundColor: "unset" }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(e) =>
                        handleRequestSort(e, headCell.id as keyof Data)
                      }
                    >
                      {headCell.label}
                      {orderBy === headCell.id && (
                        <Box
                          component="span"
                          sx={{ ...visuallyHidden, fontWeight: "900" }}
                        >
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      )}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
              </StyledTableHeadRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => (
                <StyledTableRow hover tabIndex={-1} key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.attempt}</TableCell>
                  <TableCell>{row.attempt_remain}</TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewAction(row);
                      }}
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
