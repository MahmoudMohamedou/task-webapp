import React, { Dispatch, SetStateAction } from "react";
import { UserAuthType } from "../types/UserAuthType";

export const AuthContext = React.createContext<{
  auth: UserAuthType | null | undefined;
  setAuth: Dispatch<SetStateAction<UserAuthType | null | undefined>>;
}>({
  auth: null,
  setAuth: () => {},
});
