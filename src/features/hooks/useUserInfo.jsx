import { useQuery } from "react-query";
import api, { getCookie } from "../api/axios";
import { showToast } from "../shared/AppSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export function useUserInfo(toastTimer) {
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
        const response = await api.get("/api/accounts/auth/me/");
        return response.data;
      } catch (error) {
        const errorMessage = error.message?.includes("Network Error")
          ? "خطا در اتصال به اینترنت"
          : error.response?.status === 401
            ? "توکن نامعتبر است"
            : "خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.";
        dispatch(showToast(toastTimer, errorMessage, "error"));
        return null;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
