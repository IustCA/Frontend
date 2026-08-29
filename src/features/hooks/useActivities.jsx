import { useQuery } from "react-query";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../shared/AppSlice";

export function useActivities(toastTimer) {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["fetch_activities"],
    queryFn: async () => {
      try {
        const response = await api.get("/api/accounts/activities/");
        const data = response.data;
        return data.results;
      } catch (error) {
        const errorMessage = error.message?.includes("Network Error")
          ? "خطا در اتصال به اینترنت"
          : "خطا در دریافت فعالیت‌ها";
        dispatch(showToast(toastTimer, errorMessage, "error"));
        return [];
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
