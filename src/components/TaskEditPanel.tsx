import { Grid, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { AssigneeType, PriorityType, TaskEditItem } from "../types/Column";
import { Editor } from "draft-js";
import RichEditor2 from "./RichEditor/RichEditor2";
import PriorityEdit from "./PriorityEdit";
import AssigneeEdit from "./AssigneeEdit";

type Props = {
  editTask: TaskEditItem;
  onTaskChange: Dispatch<SetStateAction<TaskEditItem>>;
};
const TaskEditPanel = React.forwardRef<Editor, Props>(
  ({ editTask, onTaskChange: setEditTask }, ref) => {
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
              "& .MuiInputLabel-focused": {
                color: theme.palette.primary.main,
              },
            })}
            value={editTask?.title}
            onChange={(e) => handleTaskTitleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <AssigneeEdit
            item={editTask}
            onAssigneeChange={handleTaskAssigneeChange}
          />
        </Grid>
        <Grid item xs={12}>
          <PriorityEdit
            item={editTask}
            onPriorityChange={handleTaskPriorityChange}
          />
        </Grid>

        <Grid item xs={12}>
          <RichEditor2 ref={ref} />
        </Grid>
      </Grid>
    );
  }
);

export default TaskEditPanel;
