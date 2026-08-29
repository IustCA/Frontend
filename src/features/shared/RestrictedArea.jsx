import { ProfilePageSkeleton } from "./PageLoader";
import { useUserInfo } from "../hooks/useUserInfo";

export default function RestrictedArea({ children }) {
  const { data, isLoading } = useUserInfo();

  if (isLoading || data === null) return <ProfilePageSkeleton />;
  return <>{children}</>;
}
