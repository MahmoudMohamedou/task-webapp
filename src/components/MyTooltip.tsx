import { Tooltip, TooltipProps } from "@mui/material";

const MyTooltip = (props: TooltipProps) => {
  return (
    <Tooltip
      {...props}
      PopperProps={{
        sx: {
          zIndex: 1800,
        },
      }}
    />
  );
};

export default MyTooltip;
