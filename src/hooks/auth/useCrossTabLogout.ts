import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearSession } from "@/app/features/auth/authSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { appApi } from "@/services/api";
import { LOGOUT_BROADCAST_CHANNEL, ROUTER_PATH } from "@/shared/constants";
import { clearAccessToken } from "@/shared/helpers";

export function broadcastLogout(): void {
  try {
    const channel = new BroadcastChannel(LOGOUT_BROADCAST_CHANNEL);
    channel.postMessage("logout");
    channel.close();
  } catch {
    /* BroadcastChannel not supported */
  }
}

export default function useCrossTabLogout(): void {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let channel: BroadcastChannel | null = null;

    try {
      channel = new BroadcastChannel(LOGOUT_BROADCAST_CHANNEL);
      channel.onmessage = () => {
        clearAccessToken();
        dispatch(clearSession());
        dispatch(appApi.util.resetApiState());
        navigate(ROUTER_PATH.LOGIN, { replace: true });
      };
    } catch {
      /* BroadcastChannel not supported */
    }

    return () => {
      channel?.close();
    };
  }, [dispatch, navigate]);
}
