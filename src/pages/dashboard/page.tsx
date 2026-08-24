import { selectSession } from "@/app/features/auth/authSelector";
import { useAppSelector } from "@/app/store/hooks";
import DashboardEmptyState from "@/components/page/dashboard/DashboardEmptyState";

export default function DashboardPage() {
  const session = useAppSelector(selectSession);
  const firstName = session?.firstName?.trim() || "there";

  return <DashboardEmptyState firstName={firstName} isLoading={false} />;
}
