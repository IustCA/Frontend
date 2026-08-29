import { useQuery } from "react-query";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../shared/AppSlice";

export function useProjects(toastTimer) {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["fetch_projects"],
    queryFn: async () => {
      try {
        const response = await api.get("/api/accounts/projects/");
        const data = response.data;
        // handle paginated response {results: []} vs plain array
        return data.results;
      } catch (error) {
        const errorMessage = error.message?.includes("Network Error")
          ? "خطا در اتصال به اینترنت"
          : "خطا در دریافت پروژه‌ها";
        dispatch(showToast(toastTimer, errorMessage, "error"));
        return [];
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
