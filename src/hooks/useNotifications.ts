import axiosInstance from "@/api";
import { AuthContext } from "@/components/Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

function getNotifications() {
  return axiosInstance.get("/notifications", {
    params: {
      page: 1,
    },
  });
}
export default function useNotifications() {
  const { isAuth } = useContext(AuthContext) as { isAuth: boolean };
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    select: (data) => data.data,
    enabled: isAuth,
  });
}
