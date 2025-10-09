import type { Question } from "@/types/backend";
import axiosInstance from ".";

export function getUserQuestions(id: number) {
  return axiosInstance.get<{ data: Question[] }>(`/questions/${id}`);
}
