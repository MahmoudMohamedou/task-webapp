import { FunctionComponent, PropsWithChildren } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";
import { LinearProgress } from "@mui/material";

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const authUser = useAuth();
  if (authUser.auth === undefined) {
    return (
      <LinearProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "50%",
          transform: "translate(-50%, -50%)",
        }}
        variant="indeterminate"
      />
    );
  }
  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
