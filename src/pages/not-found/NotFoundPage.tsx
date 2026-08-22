import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "@/shared/constants";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="The page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate(ROUTER_PATH.DASHBOARD)}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}
