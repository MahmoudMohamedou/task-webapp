import { lazy } from "react";
export const routes = [
  {
    path: "/auth/verify/account",
    component: lazy(() => import("./views/SignUpSuccess")),
    protected: false,
  },
  {
    path: "/signin",
    component: lazy(() => import("./views/SignIn")),
    protected: false,
  },
  {
    path: "/signup",
    component: lazy(() => import("./views/SignUp")),
    protected: false,
  },
  {
    path: "/",
    component: lazy(() => import("./views/Kanban")),
  },
  {
    path: "/home",
    component: lazy(() => import("./views/Kanban")),
  },
];
