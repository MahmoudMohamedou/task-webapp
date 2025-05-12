import { useEffect, useState } from "react";
import { UserAuthType } from "../types/UserAuthType";

const useAuth = () => {
  const [auth, setAuth] = useState<UserAuthType | null>();

  useEffect(() => {
    // check if session is still valid

    fetch(import.meta.env.VITE_API_VALID_SESSION_URL!, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setAuth(res);
      })
      .catch((e) => {
        console.error(e);
        setAuth(null);
      });
  }, []);

  return {
    auth,
    setAuth,
  };
};

export default useAuth;
