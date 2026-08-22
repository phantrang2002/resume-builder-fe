import { useNavigate } from "react-router-dom";
import { useLoginMutation, useLazyGetProfileQuery } from "@/services/api";
import { PRIVATE_DEFAULT_ROUTE } from "@/shared/constants";
import type { LoginParams } from "@/shared/types";

export default function useLogin() {
  const navigate = useNavigate();
  const [loginMut, { isLoading: isLoginLoading }] = useLoginMutation();
  const [fetchProfile, { isLoading: isProfileLoading }] = useLazyGetProfileQuery();

  const login = async (payload: LoginParams) => {
    await loginMut(payload).unwrap();
    await fetchProfile().unwrap();
    navigate(PRIVATE_DEFAULT_ROUTE, { replace: true });
  };

  return {
    login,
    loading: isLoginLoading || isProfileLoading,
  };
}
