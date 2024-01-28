import React, { FC, Suspense, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom";
import { routes } from "../routes";
import Header from "../components/Header";
import { DrawerContext } from "../DrawerContext";
import NavBar from "../components/NavBar";

const loadDrawerWidth = () => {
  const state = localStorage.getItem("nav-bar-state");
  return state && state !== null ? (JSON.parse(state) ? 240 : 100) : 100;
};

export const Page: FC = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = useState(loadDrawerWidth());
  const { key } = useLocation();

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

  const renderLayout = () => {
    const ElementComponent = routes.find((f) => f.path === pathname);

    if (!ElementComponent) return null;

    return (
      <Suspense>
        <ElementComponent.component key={key} />
      </Suspense>
    );
  };

  return (
    <DrawerContext.Provider
      value={{
        drawerWidth,
        mobileOpen,
        onDrawerClose: handleDrawerClose,
        onDrawerToggle: handleDrawerToggle,
        onDrawerWidthChange: setDrawerWidth,
        onTransitionEnd: handleDrawerTransitionEnd,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <NavBar />
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
          }}
        >
          {renderLayout()}
        </Box>
      </Box>
    </DrawerContext.Provider>
  );
};
