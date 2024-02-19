export type FetchType = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: string;
  credentials?: "include" | "omit";
};
