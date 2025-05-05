import {
  Box,
  Button,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";

export const StyledSettingBox = styled(Box)(({ theme }) => ({
  background: theme.palette.survey["white"],
  boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
  borderRadius: "32px",
  height: "100%",
  padding: "32px",
}));

export const StyledSettingTitle = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  fontWeight: "bold",
  borderBottom: "1px solid",
  paddingBottom: "16px",
  borderColor: theme.palette.survey["dashboardBoxBorder"],
}));

export const StyledFileBoxdTitle = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "bold",
}));

export const StyledleftBoxTitle = styled(Typography)(() => ({
  padding: "16px 32px",
}));

export const SyledHeadingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid",
  borderColor: theme.palette.survey["dashboardTitleBorder"],
  marginBottom: "15px",
}));

export const StyledContainer = styled(Box)(() => ({
  padding: "30px 0px",
  borderRadius: 10,
}));

export const StyledFeildRow = styled(Box)(() => ({
  width: "100%",
}));

export const StyledRightRow = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "65px",
  },
}));

export const StyledField = styled(TextField)({
  flex: 1,
});
export const StyledAnswerBox = styled(TextField)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const StyledAddButton = styled(Button)(() => ({
  alignItems: "flex-start",
  borderRadius: "4px",
  padding: "15px 20px",
}));

export const StyledSubmitButton = styled(Button)(() => ({
  padding: "12px 50px",
  marginTop: "15px",
}));

export const StyledSelect = styled(Select)(() => ({
  flex: 1,
  "& .css-si86to-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
    {
      borderRadius: "8px",
      padding: "16.5px 14px",
    },
}));

export const StyledFileInput = styled("input")({
  width: "180px",
  height: "40px",
  padding: "10px",
  borderRadius: "8px",
  marginRight: "16px",
  fontSize: "14px",
});

export const Styledlabel = styled("label")({
  flex: 1,
});

export const StyledQueBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

export const StyledAnsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "16px",
}));

export const StyledAnsField = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  width: "100%",
  marginBottom: "16px",
  gap: "16px",
}));

export const StyledFlexBox = styled(Box)(() => ({
  display: "flex",
  gap: "16px",
}));

export const StyledDeleteButton = styled(Button)(() => ({
  alignItems: "flex-start",
  borderRadius: "4px",
  padding: "15px 10px",
}));
