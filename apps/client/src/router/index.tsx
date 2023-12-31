import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "../app/404";
import { Login } from "../app/auth/login";
import { Register } from "../app/auth/register";
import { Home } from "../app/home";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
