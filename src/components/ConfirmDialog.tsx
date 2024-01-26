import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  messageText?: string;
}
const ConfirmDialog: FunctionComponent<
  ConfirmDialogProps & PropsWithChildren
> = ({
  onConfirm,
  onCancel,
  open,
  messageText = "Are you Sure ?",
  children,
}) => {
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="div">
          Are you Sure ?
        </Typography>
        <IconButton onClick={onCancel}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContentText sx={{ padding: "0px 24px" }}>
        {children ?? messageText}
      </DialogContentText>
      <DialogActions>
        <Button variant="text" color="inherit" size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="text" color="primary" size="small" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
