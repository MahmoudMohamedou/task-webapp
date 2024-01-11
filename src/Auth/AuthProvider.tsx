import { FunctionComponent, PropsWithChildren } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
