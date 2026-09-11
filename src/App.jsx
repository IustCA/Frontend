import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense, useRef } from "react";
import Toast from "./features/shared/Toast.jsx";
import Navbar from "./features/shared/Navbar.jsx";
import RestrictedArea from "./features/shared/RestrictedArea.jsx";
import PublicArea from "./features/shared/PublicArea.jsx";
import {
  LoginPageSkeleton,
  ProfilePageSkeleton,
} from "./features/shared/PageLoader.jsx";

const Login = lazy(() => import("./features/pages/Login.jsx"));
const Profile = lazy(() => import("./features/pages/Profile.jsx"));

export default function App() {
  const toastTimer = useRef(null);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Navigate to="/login" replace />} />
          <Route
            path="login"
            element={
              <PublicArea toastTimer={toastTimer}>
                <Suspense fallback={<LoginPageSkeleton />}>
                  <Login toastTimer={toastTimer} />
                </Suspense>
              </PublicArea>
            }
          />
          <Route
            path="profile"
            element={
              <RestrictedArea toastTimer={toastTimer}>
                <Suspense fallback={<ProfilePageSkeleton />}>
                  <Profile toastTimer={toastTimer} />
                </Suspense>
              </RestrictedArea>
            }
          />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
      </BrowserRouter>
      <Toast />
    </>
  );
}
