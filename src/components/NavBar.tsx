import { Box, Drawer } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import DrawerContent from "./DrawerContent";
import { DrawerContext } from "../DrawerContext";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const { drawerWidth, mobileOpen, onDrawerClose, onTransitionEnd } =
    useContext(DrawerContext);
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={onTransitionEnd}
        onClose={onDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            zIndex: 1400,
          },
        }}
      >
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            zIndex: 1400,
          },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
};

export default NavBar;
