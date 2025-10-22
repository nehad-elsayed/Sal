import type { Question } from "@/types/backend";
import axiosInstance from ".";

// {{domain}}/users/userName/questions?page=1

export function getUserQuestions(userName: string) {
  return axiosInstance.get<{ data: Question[] }>(`/users/${userName}/questions?page=1`);
}
