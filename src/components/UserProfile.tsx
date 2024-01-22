import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AvatarLogo from "./AvatarLogo";
import { ListItemButton, ListItemIcon, ListSubheader } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch(import.meta.env.VITE_API_URL_LOGOUT!, {
      method: "GET",
      credentials: "include",

      headers: {
        "content-type": "application/json",
      },
    })
      .then(() => setAuth(null))
      .then(() => {
        navigate("/signin");
      })
      .catch((e) => {
        console.log(e);
        setAuth(null);
      });
  };
  return (
    <List
      subheader={<ListSubheader>Profile</ListSubheader>}
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <AvatarLogo username={auth!.name} />
        </ListItemAvatar>
        <ListItemText primary={auth?.name} secondary={auth!.email} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default UserProfile;
