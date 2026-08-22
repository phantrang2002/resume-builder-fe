import LoginForm from "@/components/page/login/LoginForm";
import useLogin from "@/hooks/auth/useLogin";
import { TOKEN_EXPIRED_MESSAGE } from "@/shared/constants";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { login, loading } = useLogin();

  useEffect(() => {
    if (sessionStorage.getItem("token_expired") === "true") {
      toast.error(TOKEN_EXPIRED_MESSAGE, { toastId: "token-expired" });
      sessionStorage.removeItem("token_expired");
    }
  }, []);

  const onSubmit = async (validated: { email: string; password: string }) => {
    await login(validated);
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-[2rem] font-semibold leading-tight text-pageTitle">Welcome back</h1>
        <p className="mt-2 text-sm font-normal text-subtle">Sign in to keep working on your resumes.</p>
      </div>
      <LoginForm loading={loading} onSubmit={onSubmit} />
    </div>
  );
}
