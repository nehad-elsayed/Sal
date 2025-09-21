import axiosInstance from "@/api";
import { AuthContext } from "@/components/Contexts/AuthContext";
import type { Question } from "@/types/backend";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

function getQuestions() {
  return axiosInstance.get<{ data: Question[] }>("/questions?page=1");
}

export default function useQuestions() {
  const { isAuth } = useContext(AuthContext) as { isAuth: boolean };
  return useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
    select: (data) => data.data,
    enabled: isAuth,
  });
}
