import RootLayout from "@/components/RootLayout";
import Login from "@/Pages/Login";
import SignUp from "@/Pages/SignUp";
import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import LoadingLogo from "@/components/LoadingLogo";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/Pages/Home";


const routes : RouteObject[] = [
  {
    path: "/",
    element: <Suspense fallback={<LoadingLogo />}>{<RootLayout />}</Suspense>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;