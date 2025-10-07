import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import ErrorBoundary from "../ErrorBoundary";
import ErrorFallback from "../ErrorBoundary/ErrorFallback";
export default function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen container mt-4 ">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
}
