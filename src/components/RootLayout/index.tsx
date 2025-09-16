import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
export default function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen container mt-4 ">
        <Outlet />
      </div>
    </>
  );
}
