import { FunctionComponent } from "react";
import PriorityOption from "./PriorityOption";
import { Autocomplete, TextField } from "@mui/material";
import { PriorityType, TaskItem } from "../types/Column";
import { OPTIONS } from "../consts/priority-enum";

interface PriorityEditProps {
  item: TaskItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPriorityChange: (
    _: React.SyntheticEvent<Element, Event>,
    value: PriorityType | null
  ) => void;
  onBlur?: () => void;
}

const PriorityEdit: FunctionComponent<PriorityEditProps> = ({
  item,
  onPriorityChange,
  onBlur,
}) => {
  const priorityValue = OPTIONS.find((o) => o.value === item.priority) ?? null;
  return (
    <Autocomplete
      sx={{
        width: "100%",
      }}
      options={OPTIONS}
      value={priorityValue}
      onChange={onPriorityChange}
      onBlur={onBlur}
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
          label="Priority"
          autoFocus
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
        <PriorityOption {...props} key={option.value} option={option} />
      )}
    />
  );
};

export default PriorityEdit;
