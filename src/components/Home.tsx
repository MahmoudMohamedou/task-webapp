import React, { FC, useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, ListSubheader, Popover, Stack, Theme } from "@mui/material";
import { ChevronLeft, ChevronRight, Notifications } from "@mui/icons-material";
import AvatarLogo from "./AvatarLogo";
import UserProfile from "./UserProfile";
import { AuthContext } from "../Auth/AuthContext";
import Kanban from "./Kanban";

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  appLogo: {
    width: 100,
    height: 100,
  },
}));

const loadNavbarState = () => {
  const state = localStorage.getItem("nav-bar-state");

  return state && state !== null ? JSON.parse(state) : null;
};

const loadDrawerWidth = () => {
  const state = localStorage.getItem("nav-bar-state");
  return state && state !== null ? (JSON.parse(state) ? 240 : 100) : 100;
};

export const Home: FC = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [expandNavBar, setExpandNavBar] = useState(loadNavbarState());
  const [drawerWidth, setDrawerWidth] = useState(loadDrawerWidth());
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(
    null
  );
  const classes = useStyles();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNavBarToggle = () => {
    setDrawerWidth(expandNavBar ? 100 : 240);
    const state = !expandNavBar;
    // Store in Localestorage
    localStorage.setItem("nav-bar-state", JSON.stringify(state));
    setExpandNavBar(state);
  };

  const handleClickHome = (key: string) => {
    navigate(`/${key}`);
    //setLayout(LAYOUT[key]);
  };

  const handleClickAvatar = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const renderLayout = () => {
    let element;

    switch (pathname) {
      case "/home": {
        element = <Kanban />;
        break;
      }
      default:
        element = <div />;
    }

    return element;
  };

  const drawer = (
    <div>
      <Toolbar className={classes.toolbar}>
        {expandNavBar ? (
          <img src="kanban.jpg" alt="Kanban logo" className={classes.appLogo} />
        ) : null}
        <IconButton onClick={handleNavBarToggle}>
          {expandNavBar ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        subheader={expandNavBar ? <ListSubheader>Views</ListSubheader> : null}
      >
        <ListItem alignItems="center" disablePadding>
          <ListItemButton
            selected={pathname === "/home"}
            onClick={() => handleClickHome("home")}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <HomeIcon color={pathname === "/home" ? "primary" : "action"} />
            </ListItemIcon>
            {expandNavBar ? (
              <ListItemText
                sx={(theme: Theme) => ({
                  color:
                    pathname === "/home"
                      ? theme.palette.primary.main
                      : theme.palette.text.disabled,
                  "& span": {
                    fontWeight: 600,
                  },
                })}
              >
                Tasks
              </ListItemText>
            ) : null}
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
            onClick={handleDrawerToggle}
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
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          justifyContent: "center",
          position: "absolute",
          left: `${drawerWidth}px`,
          top: "64px",
          paddingTop: "16px",
          width: `calc(100% - ${drawerWidth}px)`,
          // width: `calc(100% - ${drawerWidth}px)`,

          // backgroundColor: "red",
        }}
      >
        {renderLayout()}
      </Box>
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
    </Box>
  );
};
