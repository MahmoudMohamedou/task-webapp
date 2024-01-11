import { FC, PropsWithChildren, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
};
