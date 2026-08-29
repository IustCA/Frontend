import { useNavigate } from "react-router";
import api from "../api/axios";
import { useQueryClient } from "react-query";
import { showToast } from "../shared/AppSlice";
import { useDispatch } from "react-redux";

const setAuthCookie = (token) => {
  document.cookie = `access_token=${token}; path=/;  SameSite=Lax`;
};

export default function Login({ toastTimer }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const QueryClient = useQueryClient();

  const onSubmit = async () => {
    try {
      const payload = {
        username: "ali_rezaei",
        password: "string",
      };

      const response = await api.post("/api/accounts/auth/login/", payload);
      if (response.data.access) {
        await setAuthCookie(response.data.access);
      }
      await QueryClient.invalidateQueries(["fetch_user_info"]);

      navigate("profile");
    } catch (error) {
      const errorMessage = error.message.includes("Network Error")
        ? "خطا در اتصال به اینترنت"
        : error.message.includes("400")
          ? "کد ملی یا کلمه عبور اشتباه است"
          : "خطا در ورود. لطفاً دوباره تلاش کنید.";
      dispatch(showToast(toastTimer, errorMessage, "error"));
    }
  };

  return <button onClick={onSubmit}>ok!</button>;
}
