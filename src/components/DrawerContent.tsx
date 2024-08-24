import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Theme,
  Toolbar,
  useTheme,
} from "@mui/material";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import { DrawerContext } from "../DrawerContext";
import { icons } from "../consts/Icons";
import Icon from "@mdi/react";

interface DrawerProps {}

const loadNavbarState = () => {
  const state = localStorage.getItem("nav-bar-state");
  return state && state !== null ? JSON.parse(state) : null;
};

const DrawerContent: FunctionComponent<DrawerProps> = () => {
  const { onDrawerWidthChange } = useContext(DrawerContext);
  const [expandNavBar, setExpandNavBar] = useState(loadNavbarState());
  const navigate = useNavigate();
  const theme = useTheme();
  const kanbanRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const handleNavBarToggle = () => {
    onDrawerWidthChange(expandNavBar ? 100 : 240);
    const state = !expandNavBar;
    // Store in Localestorage
    localStorage.setItem("nav-bar-state", JSON.stringify(state));
    setExpandNavBar(state);
  };

  const handleClickHome = (path: string) => {
    navigate(path);
    //setLayout(LAYOUT[key]);
  };

  useEffect(() => {
    if (kanbanRef.current && pathname === "/") {
      kanbanRef.current.click();
    }
  }, [pathname, kanbanRef]);

  return (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {expandNavBar ? (
          <img
            src="kanban.jpg"
            alt="Kanban logo"
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : null}
        <IconButton onClick={handleNavBarToggle}>
          {expandNavBar ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        subheader={expandNavBar ? <ListSubheader>Views</ListSubheader> : null}
      >
        {PATHS.map((r) => (
          <ListItem key={r.label} alignItems="center" disablePadding>
            <ListItemButton
              ref={kanbanRef}
              selected={pathname === r.path}
              onClick={() => handleClickHome(r.path)}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  path={icons[r.icon]}
                  size={1}
                  color={theme.palette.primary.main}
                />
              </ListItemIcon>
              {expandNavBar ? (
                <ListItemText
                  sx={(theme: Theme) => ({
                    color:
                      pathname === r.path
                        ? theme.palette.primary.main
                        : theme.palette.text.disabled,
                    "& span": {
                      fontWeight: 600,
                    },
                  })}
                >
                  {r.label}
                </ListItemText>
              ) : null}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerContent;
