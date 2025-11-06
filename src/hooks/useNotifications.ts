
import { getUserNotifications } from "@/api/getUserNotifications";
import { AuthContext } from "@/components/Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";


export default function useNotifications() {
  const { isAuth } = useContext(AuthContext) as { isAuth: boolean };
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotifications,
    select: (data) => data?.data,
      enabled: isAuth,
      staleTime: 1000 * 60 * 2, // 2 minutes
      refetchOnWindowFocus: true,
  });
}
