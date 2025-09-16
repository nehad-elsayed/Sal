import RootLayout from "@/components/RootLayout";
import Login from "@/Pages/Login";
import SignUp from "@/Pages/SignUp";

import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import LoadingLogo from "@/components/LoadingLogo";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/Pages/Home";
import ProtectedAuthRoutes from "@/guards/ProtectedAuthRoutes";
import ProtectedRoutes from "@/guards/ProtectedRoutes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Suspense fallback={<LoadingLogo />}>{<RootLayout /> }</Suspense>,
    children: [
      {
        index: true,
        element: <ProtectedRoutes><Home /></ProtectedRoutes>,
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedAuthRoutes>
            <SignUp />
          </ProtectedAuthRoutes>
        ),
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
