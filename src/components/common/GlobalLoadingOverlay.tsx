import { selectIsGlobalLoading } from "@/app/features/ui/uiSlice";
import { useAppSelector } from "@/app/store/hooks";
import { Spin } from "antd";

export default function GlobalLoadingOverlay() {
  const isLoading = useAppSelector(selectIsGlobalLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
      <Spin size="large" />
    </div>
  );
}
