import SignupForm from "@/components/page/signup/SignupForm";
import useSignup from "@/hooks/auth/useSignup";
import type { SignupParams } from "@/shared/types";

export default function SignupPage() {
  const { signup, loading } = useSignup();

  const onSubmit = async (validated: SignupParams) => {
    try {
      await signup(validated);
    } catch {
      /* Toast handled by apiErrorListenerMiddleware */
    }
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-[2rem] font-semibold leading-tight text-pageTitle">Create your account</h1>
        <p className="mt-2 text-sm font-normal text-subtle">
          Free forever. No card, no trial, no watermark on your PDF.
        </p>
      </div>
      <SignupForm loading={loading} onSubmit={onSubmit} />
    </div>
  );
}
