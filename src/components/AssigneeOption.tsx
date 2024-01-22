import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import AvatarLogo from "./AvatarLogo";

interface AssigneeOptionProps {
  option: {
    label: string;
    value: string;
  };
}

const AssigneeOption: FunctionComponent<AssigneeOptionProps> = ({
  option,
  ...rest
}) => {
  const { label } = option;

  return (
    <Box
      {...rest}
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <AvatarLogo username={label} />
      <span>{label}</span>
    </Box>
  );
};

export default AssigneeOption;
