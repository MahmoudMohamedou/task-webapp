import { Snackbar, SxProps } from "@mui/material";
import { FunctionComponent, useState } from "react";
import MyAlert from "./Alert";

interface ToastSuccessProps {
  message: string;
  variant: "standard" | "filled" | "outlined";
  sx?: SxProps;
}

const ToastSuccess: FunctionComponent<ToastSuccessProps> = ({
  message,
  variant,
  sx,
}) => {
  const [open, setOpen] = useState(true);
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      autoHideDuration={2000}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <div>
        <MyAlert variant={variant} message={message} sx={sx} />
      </div>
    </Snackbar>
  );
};

export default ToastSuccess;
