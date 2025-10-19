import type { Answer } from "@/types/backend";
import axiosInstance from ".";

export function getAnswer(id: number) {
  return axiosInstance.get<{ data: Answer }>(`/answers/${id}`);
}
