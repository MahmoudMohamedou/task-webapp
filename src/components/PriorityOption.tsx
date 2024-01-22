import { FunctionComponent } from "react";
import { getTaskPriorityIcon } from "../utils/getTaskPriorityIcon";
import { Box } from "@mui/material";
import Icon from "@mdi/react";
import { icons } from "../consts/Icons";

interface PriorityOptionProps {
  option: {
    label: string;
    value: string;
  };
}

const PriorityOption: FunctionComponent<PriorityOptionProps> = ({
  option,
  ...rest
}) => {
  const { label, value } = option;
  const { color, icon } = getTaskPriorityIcon(value);
  const path = icons[icon];
  return (
    <Box
      {...rest}
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <Icon path={path} size={1} color={color} />
      <span>{label}</span>
    </Box>
  );
};

export default PriorityOption;
