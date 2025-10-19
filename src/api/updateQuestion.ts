import axiosInstance from ".";
import type { QuestionFormData } from "@/types/backend";



export function updateQuestion(id: number, data: QuestionFormData) {
  return axiosInstance.patch(`/questions/${id}`, data);
}