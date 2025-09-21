import axiosInstance from "@/api";
import type { Question } from "@/types/backend";
import { useQuery } from "@tanstack/react-query";




function userQuestions(id: number) {
  return axiosInstance.get<{  data: Question[] }>(`/questions/${id}`);
}

export default function useQuestion(id: number) {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => userQuestions(id),
  });
}       