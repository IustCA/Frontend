import { Navigate } from "react-router";
import { LoginPageSkeleton } from "./PageLoader.jsx";
import { useUserInfo } from "../hooks/useUserInfo.jsx";
import { getCookie } from "../api/axios.js";

export default function PublicArea({ children, toastTimer }) {
  const token = getCookie("access_token");
  const { data, isLoading } = useUserInfo(toastTimer, { enabled: !!token });

  if (!token) return <>{children}</>;

  if (isLoading) return <LoginPageSkeleton />;
  if (data) return <Navigate to="/profile" replace />;
  return <>{children}</>;
}
