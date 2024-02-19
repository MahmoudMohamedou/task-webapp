import { FunctionComponent } from "react";
import { useUser } from "../hooks/useUsers";
import { Autocomplete, TextField } from "@mui/material";
import AssigneeOption from "./AssigneeOption";
import { AssigneeType, TaskItem } from "../types/Column";

interface AssigneeEditProps {
  item: TaskItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAssigneeChange: (_: any, value: AssigneeType | null) => void;
  onBlur?: () => void;
}

const AssigneeEdit: FunctionComponent<AssigneeEditProps> = ({
  item,
  onAssigneeChange,
  onBlur,
}) => {
  const users = useUser();
  const assignee = users?.find((o) => o.value === item?.assignedTo?.id) ?? null;

  return (
    <Autocomplete
      sx={{
        width: "100%",
      }}
      onBlur={onBlur}
      options={users ?? []}
      value={assignee}
      onChange={onAssigneeChange}
      getOptionLabel={(option) => option.label}
      componentsProps={{
        popper: {
          sx: {
            zIndex: 2000,
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          autoFocus
          label="Assignee"
          sx={(theme) => ({
            "& .MuiInputLabel-root": {
              color: "inherit",
            },
            "& .MuiInputLabel-focused": {
              color: theme.palette.primary.main,
            },
          })}
        />
      )}
      renderOption={(props, option) => (
        <AssigneeOption {...props} key={option.value} option={option} />
      )}
    />
  );
};

export default AssigneeEdit;
