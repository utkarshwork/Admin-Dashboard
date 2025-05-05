import {
  Button,
  Paper,
  styled,
  TableCell,
  TableRow,
  Toolbar,
} from "@mui/material";

export const StyledToolbar = styled(Toolbar)(() => ({
  gap: "16px",
}));

export const StyledPaper = styled(Paper)(() => ({
  width: "100%",
  marginBottom: "32px",
  position: "relative",
}));

export const StyledDeleteButton = styled(Button)(() => ({
  position: "fixed",
  bottom: "10%",
  left: "57%",
  transform: "translate(-50%, 0%)",
  padding: "7px 30px",
}));

export const StyledTableHeadRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.survey["dashboardDarkBg"],
}));

export const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#d3006c14 !important",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.survey["white"],
  fill: theme.palette.survey["white"],
  "& .css-7x9vt0-MuiButtonBase-root-MuiTableSortLabel-root:hover, & svg:hover":
    {
      color: theme.palette.survey["white"], // assuming survey.white exists
      opacity: "1 !important",
      fill: theme.palette.survey["white"],
    },
  "& .MuiTableSortLabel-root.Mui-active, & .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon":
    {
      color: theme.palette.survey["white"],
      fill: theme.palette.survey["white"],
    },
}));
