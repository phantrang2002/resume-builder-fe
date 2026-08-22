import { selectSession } from "@/app/features/auth/authSelector";
import { useAppSelector } from "@/app/store/hooks";
import { Card, Descriptions } from "antd";

export default function DashboardPage() {
  const session = useAppSelector(selectSession);

  return (
    <Card title="Dashboard">
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="User ID">{session?.userId}</Descriptions.Item>
        <Descriptions.Item label="Email">{session?.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{session?.role}</Descriptions.Item>
        <Descriptions.Item label="Name">
          {[session?.firstName, session?.lastName].filter(Boolean).join(" ") || "—"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
