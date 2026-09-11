import { useQuery } from "react-query";
import api from "../api/axios";
import { showToast } from "../shared/AppSlice";
import { useDispatch } from "react-redux";

export function useUserInfo(toastTimer, options = {}) {
  const { enabled = true } = options;
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["fetch_user_info"],
    queryFn: async () => {
      const response = await api.get("/api/accounts/auth/me/");
      return response.data;
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onError: (error) => {
      const errorMessage = error.message?.includes("Network Error")
        ? "خطا در اتصال به اینترنت"
        : error.response?.status === 401
          ? "توکن نامعتبر است"
          : "خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.";
      dispatch(showToast(toastTimer, errorMessage, "error"));
    },
  });
}
