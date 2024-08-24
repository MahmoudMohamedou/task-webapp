import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import AvatarLogo from "./AvatarLogo";

interface AssigneeOptionProps {
  option: {
    label?: string;
    value?: string;
  };
}

const AssigneeOption: FunctionComponent<AssigneeOptionProps> = ({
  option,
  ...rest
}) => {
  const { label } = option;

  if (!label) return null;

  return (
    <Box
      {...rest}
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <AvatarLogo username={label} sx={{ width: 30, height: 30 }} />
      <span>{label}</span>
    </Box>
  );
};

export default AssigneeOption;
