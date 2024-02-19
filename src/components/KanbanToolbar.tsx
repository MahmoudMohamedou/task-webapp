import { Add, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  colors,
} from "@mui/material";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import TaskEditPanel from "./TaskEditPanel";
import { Column, TaskEditItem } from "../types/Column";
import { Editor, convertToRaw } from "draft-js";
import { AuthContext } from "../Auth/AuthContext";
import ToastSuccess from "./ToastSuccess";

interface KanbanToolbarProps {
  onColumnsChange: Dispatch<SetStateAction<Column | null>>;
}

const KanbanToolbar: FunctionComponent<KanbanToolbarProps> = ({
  onColumnsChange,
}) => {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { auth } = useContext(AuthContext);
  const DEFAULT_VALUE = {
    title: "",
    priority: "MEDIUM",
    assignedTo: {
      id: auth?.id,
      name: auth?.name,
    },
  };
  const [editTask, setEditTask] = useState<TaskEditItem>(DEFAULT_VALUE);
  const editorRef = React.useRef<Editor | null>(null);

  function handleCancel(): void {
    setOpen(false);
    setEditTask(DEFAULT_VALUE);
  }

  function handleSave(): void {
    const body = {
      ...editTask,
      status: "TODO",
      assigneeId: editTask.assignedTo?.id,
    };
    const description =
      editorRef.current?.props.editorState.getCurrentContent();
    if (description !== undefined) {
      body.description = JSON.stringify(convertToRaw(description));
    }
    delete body["assignedTo"];
    fetch(import.meta.env.VITE_API_URL_TASK!, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === undefined) {
          setOpen(false);
          setShowToast(true);
          const newItem = {
            id: res.id,
            idNum: res.idNum,
            title: res.title,
            status: res.status,
            priority: res.priority,
            description: res.description,
            assignedTo: res.assignedTo,
          };
          //setEditTask(DEFAULT_VALUE);
          onColumnsChange((prevState) => ({
            ...prevState!,
            [res.status]: {
              ...prevState![res.status],
              items: [...prevState![res.status as string].items, newItem],
            },
          }));
        }
      });
  }

  return (
    <div>
      <Button
        variant="contained"
        size="medium"
        disableRipple
        disableTouchRipple
        disableFocusRipple
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Task
      </Button>
      <Dialog
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "650px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontStyle: "italic",
            textTransform: "uppercase",
          }}
        >
          <span>Add new Task</span>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TaskEditPanel
            ref={editorRef}
            editTask={editTask}
            onTaskChange={setEditTask}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="inherit"
            size="small"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {showToast && (
        <ToastSuccess
          message="The task was successfuly created !"
          variant="filled"
          sx={{ backgroundColor: colors.green.A400 }}
        />
      )}
    </div>
  );
};

export default KanbanToolbar;
