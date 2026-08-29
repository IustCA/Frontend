import { BrowserRouter, Route, Routes } from "react-router";
import Toast from "./features/shared/Toast.jsx";
import Login from "./features/pages/Login.jsx";
import Profile from "./features/pages/Profile.jsx";
import RestrictedArea from "./features/shared/RestrictedArea.jsx";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="profile"
            element={
              <RestrictedArea>
                <Profile />
              </RestrictedArea>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toast />
    </div>
  );
}
