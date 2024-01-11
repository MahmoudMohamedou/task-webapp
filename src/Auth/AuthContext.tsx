import React, { Dispatch, SetStateAction } from "react";
import { UserAuthType } from "../types/UserAuthType";

export const AuthContext = React.createContext<{
  auth: UserAuthType | null;
  setAuth: Dispatch<SetStateAction<UserAuthType | null>>;
}>({
  auth: null,
  setAuth: () => {},
});
