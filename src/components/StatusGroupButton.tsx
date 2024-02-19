import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Column, TaskItem } from "../types/Column";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { colors } from "@mui/material";

const options = [
  { label: "Todo", value: "TODO" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
  { label: "Cancel", value: "CANCEL" },
];

type Props = {
  item: TaskItem;
  onColumnsChange: React.Dispatch<React.SetStateAction<Column | null>>;
  onClose: () => void;
};
export default function StatusGroupButton({ item }: Props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const currentStatus = options.find((f) => f.value === item.status);
  const [selectedStatus, setSelectedStatus] = React.useState(currentStatus);

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: { label: string; value: string }
  ) => {
    // change status in the backend

    fetch(`${import.meta.env.VITE_API_URL_TASK}/${item.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        status: option.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === undefined) {
          setSelectedStatus(option);
          setOpen(false);
          localStorage.setItem("detected-change", "true");
        }
      });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const getStatusIconColor = (option: { label: string; value: string }) => {
    switch (option.value) {
      case "TODO":
        return colors.grey[400];
      case "IN_PROGRESS":
        return colors.orange[400];
      case "DONE":
        return colors.green[400];
      case "CANCEL":
        return colors.red[400];
      default:
        return colors.grey[600];
    }
  };

  return (
    <div>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        sx={{ marginTop: 1 }}
      >
        <Button>{selectedStatus?.label}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option) => (
                    <MenuItem
                      key={option.value}
                      selected={option.value === selectedStatus?.value}
                      onClick={(event) => handleMenuItemClick(event, option)}
                    >
                      <ArrowRightIcon htmlColor={getStatusIconColor(option)} />
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
