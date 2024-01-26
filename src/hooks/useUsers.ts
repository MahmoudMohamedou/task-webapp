import { useEffect, useState } from "react";

export const useUser = () => {
  const [users, setUsers] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >();
  useEffect(() => {
    // get Users
    fetch(import.meta.env.VITE_API_URL_USER!, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === undefined) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setUsers(res.map((r: any) => ({ label: r.name, value: r.id })));
        }
      });
  }, []);

  return users;
};
