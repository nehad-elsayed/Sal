import { getUserQuestions } from "@/api/getUserQuestions";
import { useQuery } from "@tanstack/react-query";

export default function useQuestion(id: number) {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getUserQuestions(id),
  });
}
