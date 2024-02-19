import { FunctionComponent, PropsWithChildren } from "react";
import { Box, Button } from "@mui/material";

interface RichEditorActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const RichRditorActions: FunctionComponent<
  RichEditorActionsProps & PropsWithChildren
> = ({ children, onCancel, onSave }) => {
  return (
    <Box>
      {children}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          margin: "16px 0px",
        }}
      >
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          sx={{
            background: "white",
            color: "inherit",
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default RichRditorActions;
