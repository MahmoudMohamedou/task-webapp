import { FetchType } from "../types/FetchType";

export const getData = ({
  method,
  url,
  body,
  credentials = "include",
}: FetchType) => {
  return fetch(url, {
    method,
    credentials,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};
