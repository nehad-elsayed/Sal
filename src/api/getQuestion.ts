import type { Question } from "@/types/backend";
import axiosInstance from ".";

export function getQuestion(id: number) {
  return axiosInstance.get<{ data: Question }>(`/questions/${id}`);
}
