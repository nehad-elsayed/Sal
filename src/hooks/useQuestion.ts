import { getQuestion } from "@/api/getQuestion";
import { useQuery } from "@tanstack/react-query";

export default function useQuestion(id: number) {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestion(id),
    select: (data) => data.data,
  });
}
