import { JSX } from "react";

export interface TableColumn {
  label: string;
  tooltip?: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: any) => JSX.Element;
  sortable?: boolean;
  disablePadding: boolean;
  numeric: boolean;
  width?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface TableWrapperProps {
  title?: string;
  columns: TableColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  page: number;
  perPage: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (perPage: number, page: number) => void;
  totalRecords: number;
  sortorder?: "asc" | "desc";
  sort?: string | "";
  sortBy?: (id: string, order: "asc" | "desc") => void;
  search?: string | "";
  searchBy?: (query: string) => void;
  filters?: JSX.Element;
  selected?: number[];
  rowSelected?: (query: number[]) => void;
  isLoading?: boolean;
  modalType?: string;
  addNewRecord?: JSX.Element;
  importBtn?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewAction?: (row: any) => void;
  onDelete: (ids: number[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateRecord?: (row: any) => void;
}
export interface TableColumnData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
