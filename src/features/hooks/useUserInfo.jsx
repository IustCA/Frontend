import { useQuery } from "react-query";
import api from "../api/axios";
import { showToast } from "../shared/AppSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
};

export function useUserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["fetch_user_info"],
    queryFn: async () => {
      const token = getCookie("access_token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response = await api.get("/api/auth/me/");
        return response.data;
      } catch (error) {
        const errorMessage = error.message.includes("Network Error")
          ? "خطا در اتصال به اینترنت"
          : "خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.";
        dispatch(showToast("خطا در دریافت اطلاعات", errorMessage, "error"));
        return null;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
