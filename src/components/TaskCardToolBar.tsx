import { MoreVert } from "@mui/icons-material";
import {
  ClickAwayListener,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
  colors,
} from "@mui/material";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Column } from "../types/Column";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskView from "./TaskView";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import WarningIcon from "@mui/icons-material/Warning";
import ToastSuccess from "./ToastSuccess";

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
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const [showTaskView, setShowTaskView] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleShowTaskView = () => {
    setShowTaskView(true);
    setAnchorEl(null);
  };

  const handleRemoveTask = () => {
    setShowConfirmDialog(true);
    setAnchorEl(null);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirm = () => {
    fetch(`${import.meta.env.VITE_API_URL_TASK!}/${item.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setAnchorEl(null);
        setShowConfirmDialog(false);
        setShowToast(true);

        // onColumnsChange((prevState) => {
        //   const newItems = prevState?.[res.status].items.filter(
        //     (f) => f.id !== res.id
        //   );
        //   return {
        //     ...prevState,
        //     [res.status]: {
        //       ...prevState?.[res.status],
        //       items: newItems,
        //     },
        //   };
        // });
      });
  };

  const handleClose = () => {
    const detectedChange = localStorage.getItem("detected-change");
    if (detectedChange && JSON.parse(detectedChange)) {
      setShowTaskView(false);
      navigate("/");
      localStorage.setItem("detected-change", "false");
      return;
    }
    setShowTaskView(false);
  };

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [showToast, navigate]);

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
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener
          onClickAway={() => {
            setAnchorEl(null);
          }}
        >
          <Paper>
            <List dense>
              <ListItemButton onClick={handleShowTaskView}>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="View" />
              </ListItemButton>
              <ListItemButton onClick={handleRemoveTask}>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Remove" />
              </ListItemButton>
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
      {showTaskView && (
        <TaskView
          item={item}
          onColumnsChange={onColumnsChange}
          onClose={handleClose}
        />
      )}
      <ConfirmDialog
        open={showConfirmDialog}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <WarningIcon
          htmlColor={colors.red[600]}
          sx={{
            marginRight: 1,
          }}
        />
        <Typography
          component="span"
          sx={{
            verticalAlign: "text-bottom",
          }}
        >
          This action is irreversible.
        </Typography>
      </ConfirmDialog>
      {showToast && (
        <ToastSuccess
          message="The task was successfuly deleted !"
          variant="filled"
          sx={{
            backgroundColor: colors.green.A400,
          }}
        />
      )}
    </div>
  );
};

export default TaskCardToolBar;
