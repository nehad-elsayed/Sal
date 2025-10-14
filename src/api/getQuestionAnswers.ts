import type { Answer } from "@/types/backend";
import axiosInstance from ".";

export function getQuestionAnswers(id: number) {
  return axiosInstance.get<{ data: Answer[] }>(`/questions/${id}/answers`);
}
