import type { Question } from "@/types/backend";
import axiosInstance from ".";

export function getAllQuestions() {
  return axiosInstance.get<{ data: Question[] }>("/questions?page=2");
}
