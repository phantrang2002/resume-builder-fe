import { selectSession } from "@/app/features/auth/authSelector";
import { useAppSelector } from "@/app/store/hooks";
import useLogout from "@/hooks/auth/useLogout";
import { useGetResumesQuery } from "@/services/api";
import { ROUTER_PATH } from "@/shared/constants";
import {
  AppstoreOutlined,
  DownloadOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  EllipsisOutlined,
  LogoutOutlined,
  SettingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

function getInitials(firstName?: string, lastName?: string, email?: string) {
  const fromName = [firstName?.[0], lastName?.[0]].filter(Boolean).join("");
  if (fromName) {
    return fromName.toUpperCase();
  }
  return (email?.[0] ?? "?").toUpperCase();
}

function navClassName(isActive: boolean) {
  return [
    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
    isActive
      ? "bg-[#F2F5F9] font-semibold text-[#253D5D]"
      : "font-normal text-[#1F1D19] hover:bg-[#F2F5F9]/60 hover:text-[#253D5D]",
  ].join(" ");
}

function navIconClassName(isActive: boolean) {
  return ["text-base", isActive ? "text-[#253D5D]" : "text-[#524D44]"].join(" ");
}

export default function Sidebar() {
  const session = useAppSelector(selectSession);
  const { logout } = useLogout();
  const { data: resumesData } = useGetResumesQuery();
  const resumeCount = resumesData?.data?.summary?.total;

  const fullName =
    [session?.firstName, session?.lastName].filter(Boolean).join(" ").trim() || "Your account";
  const email = session?.email ?? "";
  const initials = getInitials(session?.firstName, session?.lastName, session?.email);

  const menuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Log out",
      onClick: () => {
        void logout();
      },
    },
  ];

  const navItems = [
    { to: ROUTER_PATH.DASHBOARD, label: "Dashboard", icon: <AppstoreOutlined /> },
    {
      to: ROUTER_PATH.RESUMES,
      label: "My resumes",
      icon: <FileTextOutlined />,
      badge: resumeCount,
    },
    { to: null, label: "Templates", icon: <AppstoreOutlined /> },
    { to: null, label: "Exports", icon: <DownloadOutlined /> },
    { to: null, label: "Job match", icon: <SolutionOutlined /> },
  ] as const;

  return (
    <aside className="flex h-screen w-[248px] shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
      <div className="px-5 pb-2 pt-6">
        <div className="inline-flex items-baseline gap-1.5 font-serif text-[22px] font-semibold leading-none tracking-tight text-[#333333]">
          Rezum
          <span className="size-[5px] shrink-0 rounded-full bg-[#2E4C74]" aria-hidden="true" />
        </div>
      </div>

      <nav className="mt-4 flex flex-col gap-0.5 px-3">
        {navItems.map((item) =>
          item.to ? (
            <NavLink key={item.label} to={item.to} className={({ isActive }) => navClassName(isActive)}>
              {({ isActive }) => (
                <>
                  <span className={navIconClassName(isActive)}>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {"badge" in item && item.badge != null && item.badge > 0 ? (
                    <span className="rounded-sm bg-[#EFEEEB] px-[6px] py-0.5 text-xs text-subtle">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          ) : (
            <button
              key={item.label}
              type="button"
              className={`${navClassName(false)} w-full text-left`}
              title="Coming soon"
            >
              <span className={navIconClassName(false)}>{item.icon}</span>
              {item.label}
            </button>
          ),
        )}
      </nav>

      <div className="mt-auto pb-4">
        <div className="px-3">
          <div className="mb-[10px] rounded-xl bg-[#EFEFED] p-3">
            <div className="flex items-center gap-2">
              <InfoCircleOutlined className="shrink-0 text-sm text-subtle" />
              <p className="text-xs font-medium leading-none text-[#524D44]">One page is enough</p>
            </div>
            <p className="mt-[7px] text-xs leading-[18px] text-subtle">
              Recruiters spend about 7 seconds on a first pass. Keep it to one page.
            </p>
          </div>

          <button
            type="button"
            className={`${navClassName(false)} mb-3 w-full text-left`}
            title="Settings"
          >
            <span className={navIconClassName(false)}>
              <SettingOutlined />
            </span>
            Settings
          </button>
        </div>

        <div className="border-t border-[#E5E7EB] px-3 pt-3">
          <div className="flex items-center gap-2.5 px-1 py-1.5">
            <div className="flex size-[30px] shrink-0 items-center justify-center rounded-full border border-[#C4D2E3] bg-[#F2F5F9] text-[11px] font-semibold tracking-wide text-[#253D5D]">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#333333]">{fullName}</p>
              <p className="truncate text-[11px] text-[#6B7280]">{email}</p>
            </div>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="topRight">
              <button
                type="button"
                aria-label="Account menu"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#A3A29E] transition-colors hover:bg-[#F2F5F9] hover:text-[#2D3E50]"
              >
                <EllipsisOutlined className="text-base text-subtle" />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </aside>
  );
}
