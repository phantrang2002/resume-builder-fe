import { selectIsAdmin, selectIsAuthenticated } from "@/app/features/auth/authSelector";
import {
  resolveAdminRedirect,
  resolveHomeRedirect,
  resolveProtectedRedirect,
  resolvePublicRedirect,
} from "@/app/middleware/authNavigation";
import { useAppSelector } from "@/app/store/hooks";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/dashboard/page";
import SignupPage from "@/pages/signup/SignupPage";
import ForgotPasswordPage from "@/pages/forgot-password/ForgotPasswordPage";
import LoginPage from "@/pages/login/LoginPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import ResetPasswordPage from "@/pages/reset-password/ResetPasswordPage";
import { NO_ACCESS_PERMISSION_MESSAGE, ROUTER_PATH } from "@/shared/constants";
import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { toast } from "@/shared/helpers/toast";

function HomeRedirect() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return <Navigate to={resolveHomeRedirect({ isAuthenticated })} replace />;
}

function PublicRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const target = resolvePublicRedirect({ isAuthenticated });

  if (target) {
    return <Navigate to={target} replace />;
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const target = resolveProtectedRedirect({ isAuthenticated });

  if (target) {
    return <Navigate to={target} replace />;
  }

  return <MainLayout />;
}

function AdminProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const target = resolveAdminRedirect({ isAuthenticated, isAdmin });

  useEffect(() => {
    if (target && isAuthenticated) {
      toast.error({
        title: "Access denied",
        description: NO_ACCESS_PERMISSION_MESSAGE,
      });
    }
  }, [target, isAuthenticated]);

  if (target) {
    return <Navigate to={target} replace />;
  }

  return <Outlet />;
}

function AdminOnlyPage() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Admin Only</h2>
      <p className="mt-2 text-gray-600">This page is only accessible to ADMIN users.</p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTER_PATH.HOME} element={<HomeRedirect />} />

      <Route element={<PublicRoute />}>
        <Route path={ROUTER_PATH.LOGIN} element={<LoginPage />} />
        <Route path={ROUTER_PATH.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTER_PATH.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTER_PATH.RESET_PASSWORD} element={<ResetPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTER_PATH.DASHBOARD} element={<DashboardPage />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminOnlyPage />} />
        </Route>
      </Route>

      <Route path={ROUTER_PATH.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={ROUTER_PATH.NOT_FOUND} replace />} />
    </Routes>
  );
}
