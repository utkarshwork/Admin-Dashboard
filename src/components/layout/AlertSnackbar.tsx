// components/AlertComponent.tsx

import { Alert, Snackbar, Slide } from "@mui/material";

// Define the type for props
type AlertComponentProps = {
  open: boolean;
  message: string;
  severity: "error" | "success" | "info" | "warning";
  onClose: () => void;
};

// Transition component for sliding from right to left
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransitionRightToLeft = (props: any) => {
  return <Slide {...props} direction="left" />; // Slide from right to left
};

export const AlertSnackbar = ({
  open,
  message,
  severity,
  onClose,
}: AlertComponentProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={30000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={TransitionRightToLeft}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        color={severity}
        sx={(theme) => ({
          border: `1px solid ${
            severity === "error"
              ? theme.palette.survey.error
              : severity === "success"
                ? theme.palette.survey.success
                : theme.palette.grey[300]
          }`,
          color:
            severity === "error"
              ? theme.palette.survey.error
              : severity === "success"
                ? theme.palette.survey.success
                : "inherit",
        })}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
