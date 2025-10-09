import axiosInstance from ".";
import type { QuestionFormData } from "@/types/backend";

export default function addNewQuestion(data: QuestionFormData) {
  return axiosInstance.post("/questions", data);
}
