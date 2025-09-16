import { AuthContext } from "@/components/Contexts/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useContext(AuthContext) as { isAuth: boolean };
  return <>{isAuth ? children : <Navigate to="/login" />}</>;
}
