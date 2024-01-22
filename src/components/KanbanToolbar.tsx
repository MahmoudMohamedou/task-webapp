import { Add, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import TaskEditPanel from "./TaskEditPanel";
import { Column, TaskEditItem } from "../types/Column";

interface KanbanToolbarProps {
  onColumnsChange: Dispatch<SetStateAction<Column | null>>;
}

const DEFAULT_VALUE = {
  title: "",
  priority: "HIGH",
};

const KanbanToolbar: FunctionComponent<KanbanToolbarProps> = ({
  onColumnsChange,
}) => {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState<TaskEditItem>(DEFAULT_VALUE);

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
    delete body["assignedTo"];
    console.log(body, editTask);
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
          const newItem = {
            id: res.id,
            idNum: res.idNum,
            title: res.title,
            status: res.status,
            priority: res.priority,
            assignee: res.assignee,
          };
          setEditTask(DEFAULT_VALUE);
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
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Task
      </Button>
      <Dialog open={open}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Add new Task</span>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TaskEditPanel editTask={editTask} onTaskChange={setEditTask} />
        </DialogContent>
        <DialogActions>
          <Button variant="text" size="small" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default KanbanToolbar;
