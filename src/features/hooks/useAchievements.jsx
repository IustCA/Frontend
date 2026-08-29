import { useQuery } from "react-query";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../shared/AppSlice";

export function useAchievements(toastTimer) {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["fetch_achievements"],
    queryFn: async () => {
      try {
        const response = await api.get("/api/accounts/achievements/");
        const data = response.data;
        return data.results;
      } catch (error) {
        const errorMessage = error.message?.includes("Network Error")
          ? "خطا در اتصال به اینترنت"
          : "خطا در دریافت دستاوردها";
        dispatch(showToast(toastTimer, errorMessage, "error"));
        return [];
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
