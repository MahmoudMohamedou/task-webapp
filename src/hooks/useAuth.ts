import { useEffect, useState } from "react";
import { UserAuthType } from "../types/UserAuthType";

const useAuth = () => {
  const [auth, setAuth] = useState<UserAuthType | null>(null);
  console.log(import.meta.env.VITE_API_VALID_SESSION_URL);

  useEffect(() => {
    // check if session is still valid

    fetch(import.meta.env.VITE_API_VALID_SESSION_URL!, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(setAuth)
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
