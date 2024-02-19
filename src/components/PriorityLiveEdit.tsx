import { Box, ListItem, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import MyTooltip from "./MyTooltip";
import { PriorityType, TaskItem } from "../types/Column";
import Icon from "@mdi/react";
import { getTaskPriorityIcon } from "../utils/getTaskPriorityIcon";
import { icons } from "../consts/Icons";
import PriorityEdit from "./PriorityEdit";

interface PriorityLiveEditProps {
  item: TaskItem;
}

const PriorityLiveEdit: FunctionComponent<PriorityLiveEditProps> = ({
  item,
}) => {
  const [currentItem, setCurrentItem] = useState<TaskItem>(item);
  const [editMode, setEditMode] = useState(false);
  const { color, icon } = getTaskPriorityIcon(currentItem.priority ?? "");
  const path = icons[icon];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePriorityChange = (_: any, value: PriorityType | null) => {
    setCurrentItem({
      ...currentItem,
      priority: value?.value,
    });
  };

  const handleBlur = () => {
    if (currentItem.priority === item.priority) {
      setEditMode(false);
      return;
    }
    // update task
    fetch(`${import.meta.env.VITE_API_URL_TASK}/${item.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        priority: currentItem.priority,
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
      <Typography variant="body2">Priority</Typography>
      <Box
        sx={{
          "&:hover": {
            background: "white !important",
          },
        }}
      >
        {editMode ? (
          <PriorityEdit
            onBlur={handleBlur}
            item={currentItem}
            onPriorityChange={handlePriorityChange}
          />
        ) : (
          <MyTooltip title={currentItem.priority}>
            <Box
              onClick={() => {
                setEditMode(true);
              }}
            >
              <Icon path={path} size={1} color={color} />
            </Box>
          </MyTooltip>
        )}
      </Box>
    </ListItem>
  );
};

export default PriorityLiveEdit;
