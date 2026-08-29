import { ProfilePageSkeleton } from "./PageLoader";
import { useUserInfo } from "../hooks/useUserInfo";

export default function RestrictedArea({ children, toastTimer }) {
  const { data, isLoading } = useUserInfo(toastTimer);

  if (isLoading || data === null) return <ProfilePageSkeleton />;
  return <>{children}</>;
}
