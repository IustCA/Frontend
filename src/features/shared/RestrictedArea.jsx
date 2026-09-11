import { Navigate } from "react-router";
import { ProfilePageSkeleton } from "./PageLoader";
import { useUserInfo } from "../hooks/useUserInfo";
import { getCookie } from "../api/axios";

export default function RestrictedArea({ children, toastTimer }) {
  const token = getCookie("access_token");
  const { data, isLoading, isError, error } = useUserInfo(toastTimer, {
    enabled: !!token,
  });

  if (!token) return <Navigate to="/login" replace />;
  if (isLoading) return <ProfilePageSkeleton />;
  if (isError) {
    const status = error?.response?.status;
    if (status === 401 || status === 498)
      return <Navigate to="/login" replace />;
    return <>{children}</>;
  }
  if (!data) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
