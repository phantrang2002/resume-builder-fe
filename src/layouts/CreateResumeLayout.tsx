import useCrossTabLogout from "@/hooks/auth/useCrossTabLogout";
import { Outlet } from "react-router-dom";

export default function CreateResumeLayout() {
  useCrossTabLogout();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-lightBg">
      <Outlet />
    </div>
  );
}
