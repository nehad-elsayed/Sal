import { AuthContext } from "@/components/Contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAuthRoutes({ children }: { children: React.ReactNode }) {
  const { isAuth } = useContext(AuthContext) as { isAuth: boolean };
  return <>{isAuth ?  <Navigate to="/" replace /> : children}</>;
}
