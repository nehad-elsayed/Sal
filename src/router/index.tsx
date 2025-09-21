import RootLayout from "@/components/RootLayout";
import Login from "@/Pages/LoginPage";
import SignUp from "@/Pages/SignUpPage";

import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import LoadingLogo from "@/components/LoadingLogo";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/Pages/Home";
import ProtectedAuthRoutes from "@/guards/ProtectedAuthRoutes";
import ProtectedRoutes from "@/guards/ProtectedRoutes";
import UserProfile from "@/Pages/UserProfile";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Suspense fallback={<LoadingLogo />}>{<RootLayout />}</Suspense>,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <UserProfile />
          </ProtectedRoutes>
        ),
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
