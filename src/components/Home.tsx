import React, { FC, useState } from "react";
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
import { Badge, ListSubheader, Stack, Theme } from "@mui/material";
import { ChevronLeft, ChevronRight, Notifications } from "@mui/icons-material";
import AvatarLogo from "./AvatarLogo";

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

const LAYOUT: { [key: string]: JSX.Element } = {
  home: <div>Home</div>,
};

export const Home: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [layout, setLayout] = useState<JSX.Element | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [expandNavBar, setExpandNavBar] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(240);
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
    setExpandNavBar(!expandNavBar);
  };

  const handleClickHome = (key: string) => {
    navigate({
      pathname: `/${key}`,
    });
    setLayout(LAYOUT[key]);
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
                Home
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
            <IconButton>
              <AvatarLogo username="Mohamed" />
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {layout}
      </Box>
    </Box>
  );
};
