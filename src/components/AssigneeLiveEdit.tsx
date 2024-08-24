import { FunctionComponent, useState } from "react";
import { AssigneeType, TaskItem } from "../types/Column";
import AssigneeEdit from "./AssigneeEdit";
import AvatarLogo from "./AvatarLogo";
import { Box, ListItem, Typography } from "@mui/material";

interface AssigneLiveEditProps {
  item: TaskItem;
}

const AssigneLiveEdit: FunctionComponent<AssigneLiveEditProps> = ({ item }) => {
  const [currentItem, setCurrentItem] = useState<TaskItem>(item);
  const [editMode, setEditMode] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAssigneeChange = (_: any, value: AssigneeType | null) => {
    setCurrentItem({
      ...currentItem,
      assignedTo: value
        ? {
            id: value.value,
            name: value.label,
          }
        : undefined,
    });
  };

  const handleBlur = () => {
    if (currentItem.assignedTo?.id === item.assignedTo?.id) {
      setEditMode(false);
      //localStorage.setItem("detected-change", "true");
      return;
    }
    // update task
    fetch(`${import.meta.env.VITE_API_URL_TASK}/${item.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        assigneeId: currentItem.assignedTo?.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setEditMode(false);
        localStorage.setItem("detected-change", "true");
      });
  };

  return (
    <ListItem>
      <Typography variant="body2">Assignee</Typography>
      <Box
        sx={{
          "&:hover": {
            background: "white !important",
          },
        }}
      >
        {editMode ? (
          <AssigneeEdit
            item={currentItem}
            onBlur={handleBlur}
            onAssigneeChange={handleAssigneeChange}
          />
        ) : (
          <Box
            onClick={() => {
              setEditMode(true);
            }}
          >
            <AvatarLogo
              username={currentItem.assignedTo?.name ?? ""}
              sx={{
                width: 30,
                height: 30,
              }}
            />
          </Box>
        )}
      </Box>
    </ListItem>
  );
};

export default AssigneLiveEdit;
