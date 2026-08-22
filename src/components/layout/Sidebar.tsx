import { DashboardOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { ROUTER_PATH } from "@/shared/constants";

const navItems = [
  {
    to: ROUTER_PATH.DASHBOARD,
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <span className="text-lg font-bold text-primary">App</span>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              ].join(" ")
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
