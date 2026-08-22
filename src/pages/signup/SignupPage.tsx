import SignupForm from "@/components/page/signup/SignupForm";
import useSignup from "@/hooks/auth/useSignup";

export default function SignupPage() {
  const { signup, loading } = useSignup();

  const onSubmit = async (validated: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      await signup(validated);
    } catch {
      /* Toast handled by apiErrorListenerMiddleware */
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-pageTitle">Create account</h1>
        <p className="mt-2 text-sm text-gray-500">Sign up to get started</p>
      </div>
      <SignupForm loading={loading} onSubmit={onSubmit} />
    </div>
  );
}
