import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import useCrossTabLogout from "@/hooks/auth/useCrossTabLogout";

export default function MainLayout() {
  useCrossTabLogout();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto bg-lightBg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
