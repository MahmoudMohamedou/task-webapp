import {
  Autocomplete,
  Grid,
  TextField,
  TextareaAutosize,
  colors,
  styled,
} from "@mui/material";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import PriorityOption from "./PriorityOption";
import { TaskEditItem } from "../types/Column";
import AssigneeOption from "./AssigneeOption";

type PriorityType = {
  label: string;
  value: "HIGH" | "MEDIUM" | "LOW";
};
type AssigneeType = {
  label: string;
  value: string;
};
const OPTIONS: Array<PriorityType> = [
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

const TextArea = styled(TextareaAutosize)(
  () => `
  width: 100%;
  padding: 16px;
  &:hover {
    /*border-color: ${colors.blue[400]};*/
  }

  &:focus {
    border-width: 2px;
    border-color: #1976d2;
    border-radius: 5px;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

type Props = {
  editTask: TaskEditItem;
  onTaskChange: Dispatch<SetStateAction<TaskEditItem>>;
};
const TaskEditPanel: FunctionComponent<Props> = ({
  editTask,
  onTaskChange: setEditTask,
}) => {
  const [users, setUsers] = useState<AssigneeType[]>();
  const handleTaskTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditTask({
      ...editTask,
      title: e.target.value,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTaskPriorityChange = (_: any, value: PriorityType | null) => {
    setEditTask({
      ...editTask,
      priority: value?.value,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTaskAssigneeChange = (_: any, value: AssigneeType | null) => {
    setEditTask({
      ...editTask,
      assignedTo: value
        ? {
            id: value.value,
            name: value.label,
          }
        : null,
    });
  };

  useEffect(() => {
    // get Users
    fetch(import.meta.env.VITE_API_URL_USER!, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === undefined) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setUsers(res.map((r: any) => ({ label: r.name, value: r.id })));
        }
      });
  }, []);

  const priorityValue = OPTIONS.find((o) => o.value === editTask.priority);
  const assignee =
    users?.find((o) => o.value === editTask.assignedTo?.id) ?? null;

  return (
    <Grid container gap={4}>
      <Grid item xs={12}>
        <TextField
          name="title"
          label="Title"
          required
          size="small"
          sx={(theme) => ({
            width: "100%",
            marginTop: 1,
            "& .MuiInputLabel-root": {
              color: "inherit",
            },
            "& .Mui-focused": {
              color: theme.palette.primary.main,
            },
          })}
          value={editTask?.title}
          onChange={(e) => handleTaskTitleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          options={users ?? []}
          value={assignee}
          onChange={handleTaskAssigneeChange}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Assignee" />
          )}
          renderOption={(props, option) => (
            <AssigneeOption {...props} key={option.value} option={option} />
          )}
          sx={(theme) => ({
            "& .MuiInputLabel-root": {
              color: "inherit",
            },
            "& .Mui-focused": {
              color: theme.palette.primary.main,
            },
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          options={OPTIONS}
          value={priorityValue}
          onChange={handleTaskPriorityChange}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Priority" />
          )}
          renderOption={(props, option) => (
            <PriorityOption {...props} key={option.value} option={option} />
          )}
          sx={(theme) => ({
            "& .MuiInputLabel-root": {
              color: "inherit",
            },
            "& .Mui-focused": {
              color: theme.palette.primary.main,
            },
          })}
        />
      </Grid>

      <Grid item xs={12}>
        <TextArea
          minRows={5}
          value={editTask.description}
          onChange={(e) =>
            setEditTask({
              ...editTask,
              description: e.target.value,
            })
          }
          placeholder="Description"
        />
      </Grid>
    </Grid>
  );
};

export default TaskEditPanel;
