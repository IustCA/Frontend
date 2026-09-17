import { useQuery } from "react-query";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../shared/AppSlice";

export function useStudentsSearch(toastTimer, params = {}, options = {}) {
  const { enabled = true } = options;
  const { full_name = "", offset = 0, limit = 10 } = params;
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["fetch_students_search", full_name, offset, limit],
    queryFn: async () => {
      try {
        const response = await api.get("/api/accounts/students/", {
          params: { full_name, offset, limit },
        });
        return response.data;
      } catch (error) {
        const errorMessage = error.message?.includes("Network Error")
          ? "خطا در اتصال به اینترنت"
          : error.response?.status === 401
            ? "نشست شما منقضی شده، لطفا دوباره وارد شوید"
            : "خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.";
        dispatch(showToast(toastTimer, errorMessage, "error"));
        return { count: 0, offset, limit, results: [] };
      }
    },
    enabled,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
