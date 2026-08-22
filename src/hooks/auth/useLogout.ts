import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { clearSession } from "@/app/features/auth/authSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { appApi, useLogoutMutation } from "@/services/api";
import { ROUTER_PATH } from "@/shared/constants";
import { clearAccessToken } from "@/shared/helpers";
import { broadcastLogout } from "@/hooks/auth/useCrossTabLogout";
import { toast } from "react-toastify";

export default function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMut] = useLogoutMutation();

  const logout = useCallback(async () => {
    let logoutMessage: string | undefined;

    try {
      const response = await logoutMut().unwrap();
      logoutMessage = response.message;
    } catch {
      /* still clear local session if server logout fails */
    } finally {
      clearAccessToken();
      dispatch(clearSession());
      dispatch(appApi.util.resetApiState());
      broadcastLogout();
      sessionStorage.removeItem("token_expired");
      if (logoutMessage) {
        toast.success(logoutMessage);
      }
      navigate(ROUTER_PATH.LOGIN, { replace: true });
    }
  }, [dispatch, logoutMut, navigate]);

  return { logout };
}
