import { useNavigate } from "react-router-dom";
import { useLazyGetProfileQuery, useLoginMutation, useSignupMutation } from "@/services/api";
import { PRIVATE_DEFAULT_ROUTE } from "@/shared/constants";
import type { SignupParams } from "@/shared/types";
import { toast } from "react-toastify";

export default function useSignup() {
  const navigate = useNavigate();
  const [signupMut, { isLoading: isSignupLoading }] = useSignupMutation();
  const [loginMut, { isLoading: isLoginLoading }] = useLoginMutation();
  const [fetchProfile, { isLoading: isProfileLoading }] = useLazyGetProfileQuery();

  const signup = async (payload: SignupParams) => {
    const signupResponse = await signupMut(payload).unwrap();
    toast.success(signupResponse.message);

    await loginMut({
      email: payload.email,
      password: payload.password,
    }).unwrap();
    await fetchProfile().unwrap();
    navigate(PRIVATE_DEFAULT_ROUTE, { replace: true });
  };

  return {
    signup,
    loading: isSignupLoading || isLoginLoading || isProfileLoading,
  };
}
