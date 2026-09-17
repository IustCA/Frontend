import { useQuery } from "react-query";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../shared/AppSlice";

export function usePublicProfile(toastTimer, id, options = {}) {
  const { enabled = true } = options;
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["fetch_public_profile", id],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/accounts/profile/${id}/`);
        return response.data;
      } catch (error) {
        const errorMessage = error.message?.includes("Network Error")
          ? "خطا در اتصال به اینترنت"
          : error.response?.status === 404
            ? "کاربری با این شناسه پیدا نشد"
            : "خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.";
        dispatch(showToast(toastTimer, errorMessage, "error"));
        return null;
      }
    },
    enabled: enabled && !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
