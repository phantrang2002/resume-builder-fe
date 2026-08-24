import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import useCrossTabLogout from "@/hooks/auth/useCrossTabLogout";

export default function MainLayout() {
  useCrossTabLogout();

  return (
    <div className="flex h-screen overflow-hidden bg-lightBg">
      <Sidebar />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto px-8 py-10 sm:px-12 lg:px-16">
        <Outlet />
      </main>
    </div>
  );
}
