import { Delete, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Column } from "../types/Column";

interface TaskCardToolBarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  onColumnsChange: Dispatch<SetStateAction<Column | null>>;
}

const TaskCardToolBar: FunctionComponent<TaskCardToolBarProps> = ({
  item,
  onColumnsChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(
    null
  );

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveTask = () => {
    fetch(`${import.meta.env.VITE_API_URL_TASK!}/${item.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setAnchorEl(null);
        onColumnsChange((prevState) => {
          const newItems = prevState?.[res.status].items.filter(
            (f) => f.id !== res.id
          );
          return {
            ...prevState,
            [res.status]: {
              ...prevState?.[res.status],
              items: newItems,
            },
          };
        });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
      ref={ref}
    >
      <p className="title">{item.title}</p>
      <IconButton onClick={handleClick} id={`more-vert-${item.id}`}>
        <MoreVert />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
        onClose={handleClose}
        anchorEl={anchorEl}
        disableScrollLock={true}
      >
        <List dense>
          <ListItemButton onClick={handleRemoveTask}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </ListItemButton>
        </List>
      </Popover>
    </div>
  );
};

export default TaskCardToolBar;
