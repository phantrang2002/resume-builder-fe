import { selectDisplayName } from "@/app/features/auth/authSelector";
import { useAppSelector } from "@/app/store/hooks";
import useLogout from "@/hooks/auth/useLogout";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Header() {
  const displayName = useAppSelector(selectDisplayName);
  const { logout } = useLogout();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-pageTitle">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-sm text-gray-700">
          <UserOutlined />
          {displayName}
        </span>
        <Button icon={<LogoutOutlined />} onClick={logout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
