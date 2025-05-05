import {
  Box,
  Button,
  ButtonProps,
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

export const StyledPassTitle = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "bold",
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
}));

export const SyledHeadingBoxtwo = styled(Box)(({ theme }) => ({
  display: "flex",
  borderBottom: "1px solid",
  borderColor: theme.palette.survey["dashboardTitleBorder"],
  flexDirection: "column",
  paddingBottom: "16px",
}));

export const StyledContainer = styled(Box)(() => ({
  padding: "30px 0px",
  borderRadius: 10,
}));

export const StyledRow = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "48%",
  },
}));

export const FullRow = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "97.5%",
  },
}));

export const StyledField = styled(TextField)({
  flex: 1,
});

export const StyledAddButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  marginBottom: theme.spacing(2),
  borderRadius: "30px",
  padding: "8px 20px",
}));

export const StyledSubmitButton = styled(Button)(() => ({
  marginTop: 0,
  padding: "12px 50px",
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

type StyledUploadButtonProps = ButtonProps<"span", { component: "span" }>;

export const StyledUploadButton = styled((props: StyledUploadButtonProps) => (
  <Button {...props} />
))(({ theme }) => ({
  width: "100%",
  borderRadius: "4px",
  padding: "14.5px 14px",
  boxShadow: "unset",
  border: "unset",
  background: theme.palette.survey["white"],
  color: theme.palette.survey["black"],
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: theme.palette.survey["grayBorder"],
  "&:hover": {
    borderColor: theme.palette.survey["mainPink"],
    boxShadow: "unset",
  },
}));
