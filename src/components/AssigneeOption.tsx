import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import AvatarLogo from "./AvatarLogo";
import { makeStyles } from "@mui/styles";

interface AssigneeOptionProps {
  option: {
    label?: string;
    value?: string;
  };
}

const useStyles = makeStyles(() => ({
  size: {
    width: 30,
    height: 30,
  },
}));

const AssigneeOption: FunctionComponent<AssigneeOptionProps> = ({
  option,
  ...rest
}) => {
  const { label } = option;

  const classes = useStyles();

  if (!label) return null;

  return (
    <Box
      {...rest}
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <AvatarLogo username={label} className={classes.size} />
      <span>{label}</span>
    </Box>
  );
};

export default AssigneeOption;
