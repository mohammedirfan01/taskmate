import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto py-10 px-4">
        <Outlet />
      </main>
    </>
  );
}
