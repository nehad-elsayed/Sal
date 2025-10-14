import { getAllQuestions } from "@/api/getAllQuestions";
import { AuthContext } from "@/components/Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";


export default function useQuestions() {
  const { isAuth } = useContext(AuthContext) as { isAuth: boolean };
  return useQuery({
    queryKey: ["questions"],
    queryFn: getAllQuestions,
    select: (data) => data.data,
    enabled: isAuth, 
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: true,
  });
}
