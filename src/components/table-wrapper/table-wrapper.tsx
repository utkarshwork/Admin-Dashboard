import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Checkbox,
  CircularProgress,
  TableSortLabel,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { TableColumn, TableWrapperProps } from "./table-wrapper.types";
import {
  StyledDeleteButton,
  StyledPaper,
  StyledTableCell,
  StyledTableHeadRow,
  StyledTableRow,
  StyledToolbar,
} from "./style";
import GradientCircularProgress from "../layout/loader/GradientCircularProgress";

function getComparator<T>(order: "asc" | "desc", orderBy: keyof T) {
  return order === "desc"
    ? (a: T, b: T) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a: T, b: T) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedArray = array.map((el, index) => [el, index] as [T, number]);
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedArray.map((el) => el[0]);
}

export const TableWrapper: React.FC<TableWrapperProps> = ({
  title,
  columns,
  data,
  page,
  perPage,
  totalRecords,
  onPageChange,
  onRowsPerPageChange,
  sortorder,
  sort,
  sortBy,
  search,
  searchBy,
  selected,
  rowSelected,
  isLoading,
  addNewRecord,
  importBtn,
  viewAction,
  onDelete,
  updateRecord,
  filters,
}) => {
  const [orderBy, setOrderBy] = useState<keyof TableColumn>(
    sort ? (sort as keyof TableColumn) : "id",
  );
  const [order, setOrder] = useState<"asc" | "desc">(sortorder || "desc");
  const [searchQuery, setSearchQuery] = useState(search || "");
  const [rowSelectedQuery, setRowSelectedQuery] = useState<number[]>([]);

  // Delete confirmation dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteRows, setDeleteRows] = useState<number[]>([]);

  useEffect(() => {
    setRowSelectedQuery(selected || []);
  }, [selected]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange?.(event, newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange?.(newPerPage, 0);
  };

  const visibleRows = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const filtered = searchQuery
      ? data.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        )
      : data;
    return stableSort(filtered, getComparator(order, orderBy));
  }, [data, order, orderBy, searchQuery]);

  const handleSort = (id: string) => {
    const isAsc = orderBy === id && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(id as keyof TableColumn);
    sortBy?.(id, newOrder);
  };

  const handleSearch = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      searchBy?.(searchQuery);
    }
  };

  const onSelectAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelected = event.target.checked
      ? data.map((n) => Number(n.id))
      : [];
    setRowSelectedQuery(newSelected);
    rowSelected?.(newSelected);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, id: number) => {
    event.stopPropagation();
    const newSelected = rowSelectedQuery.includes(id)
      ? rowSelectedQuery.filter((rowId) => rowId !== id)
      : [...rowSelectedQuery, id];
    setRowSelectedQuery(newSelected);
    rowSelected?.(newSelected);
  };

  const handleDeleteClick = () => {
    setDeleteRows(rowSelectedQuery);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(deleteRows);
    setOpenDeleteDialog(false);
    return true;
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setDeleteRows([]);
  };

  return (
    <StyledPaper sx={{ width: "100%", mt: 2, borderRadius: "20px" }}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ flex: "1 1 100%" }}>
          {title}
        </Typography>
        {searchBy && (
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            size="small"
            placeholder="Search..."
            sx={{ ml: 2, minWidth: 200 }}
          />
        )}
        {filters}
        {importBtn}
        {addNewRecord}
      </StyledToolbar>

      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableHeadRow>
              {rowSelected && (
                <TableCell padding="checkbox">
                  <Checkbox
                    sx={{ color: "#fff" }}
                    checked={
                      rowSelectedQuery.length > 0 &&
                      rowSelectedQuery.length === data.length
                    }
                    indeterminate={
                      rowSelectedQuery.length > 0 &&
                      rowSelectedQuery.length < data.length
                    }
                    onChange={onSelectAllCheck}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <StyledTableCell key={column.id}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
              {(viewAction || updateRecord) && (
                <StyledTableCell>
                  <TableSortLabel>Action</TableSortLabel>
                </StyledTableCell>
              )}
            </StyledTableHeadRow>
          </TableHead>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100px",
                    }}
                  >
                    <GradientCircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : visibleRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row) => {
                  const isItemSelected = rowSelectedQuery.includes(
                    Number(row.id),
                  );
                  return (
                    <StyledTableRow
                      key={row.id}
                      hover
                      onClick={() => viewAction?.(row)}
                      selected={isItemSelected}
                    >
                      {rowSelected && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleRowClick(
                                e as unknown as React.MouseEvent<unknown>,
                                Number(row.id),
                              )
                            }
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {column.render ? column.render(row) : row[column.id]}
                        </TableCell>
                      ))}

                      {(viewAction || updateRecord) && (
                        <TableCell>
                          {viewAction ? (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                viewAction(row);
                              }}
                            >
                              <VisibilityIcon />
                            </Button>
                          ) : updateRecord ? (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateRecord(row);
                              }}
                            >
                              <EditNoteIcon />
                            </Button>
                          ) : null}
                        </TableCell>
                      )}
                    </StyledTableRow>
                  );
                })
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRecords}
        page={page}
        rowsPerPage={perPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {selected && rowSelectedQuery.length > 0 && (
        <StyledDeleteButton
          variant="contained"
          color="error"
          onClick={handleDeleteClick}
        >
          Delete
        </StyledDeleteButton>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected rows?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};
