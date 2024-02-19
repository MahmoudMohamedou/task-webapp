import React, { Dispatch, SetStateAction } from "react";

export const DrawerContext = React.createContext<{
  drawerWidth: number;
  onDrawerWidthChange: Dispatch<SetStateAction<number>>;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  onTransitionEnd: () => void;
  onDrawerClose: () => void;
}>({
  drawerWidth: 0,
  onDrawerClose: () => {},
  mobileOpen: false,
  onDrawerToggle: () => {},
  onDrawerWidthChange: () => {},
  onTransitionEnd: () => {},
});
