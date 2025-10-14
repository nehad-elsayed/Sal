import SignUp from "@/Pages/SignUpPage";

import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import LoadingLogo from "@/components/LoadingLogo";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/Pages/Home";
import ProtectedAuthRoutes from "@/guards/ProtectedAuthRoutes";
import ProtectedRoutes from "@/guards/ProtectedRoutes";
import UserProfilePage from "@/Pages/UserProfile";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorBoundary/ErrorFallback";
import RootLayout from "@/components/RootLayout";
import Login from "@/Pages/LoginPage";
import QuestionDetails from "@/Pages/QuestionDetails/QuestionDetails";
 
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Suspense fallback={<LoadingLogo />}>{<RootLayout />}</Suspense>,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary fallback={<ErrorFallback />} >
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "/profile",
        element: (
          <ErrorBoundary fallback={<ErrorFallback />} >
            <ProtectedRoutes>
              <UserProfilePage />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "/login",
        element: (
          <ErrorBoundary fallback={<ErrorFallback />} >
            <ProtectedAuthRoutes>
              <Login />
            </ProtectedAuthRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "/signup",
        element: (
          <ErrorBoundary fallback={<ErrorFallback />} >
            <ProtectedAuthRoutes>
              <SignUp />
            </ProtectedAuthRoutes>
          </ErrorBoundary>
        ),
      },
      {
        path: "/question/:id",
        element: (
          <ErrorBoundary fallback={<ErrorFallback />} >
            <ProtectedRoutes>
              <QuestionDetails />
            </ProtectedRoutes>
          </ErrorBoundary>
        ),
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
