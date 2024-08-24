import * as React from "react";
import Avatar from "@mui/material/Avatar";
import MyTooltip from "./MyTooltip";
import { SxProps } from "@mui/system";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0] || ""}`,
  };
}

interface AvatarLogoProps {
  username: string;
  logoURL?: string;
  className?: string;
  sx?: SxProps;
}

const getStyles = (className?: string, sx?: SxProps, bgcolor?: string) => {
  if (sx) return { sx: bgcolor ? { ...sx, bgcolor } : sx };
  return bgcolor ? { className, sx: { bgcolor } } : { className };
};

const AvatarLogo: React.FunctionComponent<AvatarLogoProps> = ({
  username,
  className,
  sx,
}) => {
  const { children, sx: sxExtra } = stringAvatar(username);
  return (
    <MyTooltip title={username || "Not Assigned"}>
      {username ? (
        <Avatar
          children={children}
          {...getStyles(className, sx, sxExtra.bgcolor)}
        />
      ) : (
        <Avatar {...getStyles(className, sx)} />
      )}
    </MyTooltip>
  );
};

export default AvatarLogo;
