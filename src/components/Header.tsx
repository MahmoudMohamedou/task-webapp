import {
  AppBar,
  Badge,
  IconButton,
  Popover,
  Stack,
  Toolbar,
} from "@mui/material";
import { FunctionComponent, useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Notifications } from "@mui/icons-material";
import AvatarLogo from "./AvatarLogo";
import UserProfile from "./UserProfile";
import { DrawerContext } from "../DrawerContext";
import { AuthContext } from "../Auth/AuthContext";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { drawerWidth, onDrawerToggle } = useContext(DrawerContext);
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(
    null
  );
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleClickAvatar = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" noWrap component="div">
            Hello Username
          </Typography> */}
        <div />
        <Stack
          direction="row"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <Notifications htmlColor="white" />
            </Badge>
          </IconButton>
          <IconButton onClick={handleClickAvatar}>
            <AvatarLogo username={auth!.name} />
          </IconButton>
        </Stack>
      </Toolbar>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        onClose={handleProfileClose}
      >
        <UserProfile />
      </Popover>
    </AppBar>
  );
};

export default Header;
