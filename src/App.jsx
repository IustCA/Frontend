import { BrowserRouter, Route, Routes } from "react-router";
import Toast from "./features/shared/Toast.jsx";
import Login from "./features/pages/Login.jsx";
import Profile from "./features/pages/Profile.jsx";
import RestrictedArea from "./features/shared/RestrictedArea.jsx";
import { useRef } from "react";

export default function App() {
  const toastTimer = useRef(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login toastTimer={toastTimer} />} />
          <Route
            path="profile"
            element={
              <RestrictedArea toastTimer={toastTimer}>
                <Profile toastTimer={toastTimer} />
              </RestrictedArea>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toast />
    </>
  );
}
