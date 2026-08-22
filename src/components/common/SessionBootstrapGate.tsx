import useSessionBootstrap from "@/hooks/auth/useSessionBootstrap";
import { Spin } from "antd";

type SessionBootstrapGateProps = {
  children: React.ReactNode;
};

export default function SessionBootstrapGate({ children }: SessionBootstrapGateProps) {
  const isBootstrapped = useSessionBootstrap();

  if (!isBootstrapped) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Spin size="large" />
      </div>
    );
  }

  return children;
}
