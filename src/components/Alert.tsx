import CloseIcon from "@mui/icons-material/Close";
import { Alert, Collapse, IconButton, SxProps } from "@mui/material";
import { FunctionComponent, PropsWithChildren, useState } from "react";

interface MyAlertProps {
  variant?: "filled" | "outlined" | "standard";
  severity?: "error" | "info" | "success" | "warning";
  message?: string;
  sx?: SxProps;
}

const MyAlert: FunctionComponent<MyAlertProps & PropsWithChildren> = ({
  message,
  severity,
  variant,
  children,
  sx,
}) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapse in={open}>
      <Alert
        variant={variant}
        severity={severity}
        sx={{ ...sx, padding: "8px 16px" }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message || children}
      </Alert>
    </Collapse>
  );
};

export default MyAlert;
