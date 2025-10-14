import { getQuestionAnswers } from "@/api/getQuestionAnswers";
import { useQuery } from "@tanstack/react-query";

export default function useGetAnswers(id: number) {
  return useQuery({
    queryKey: ["answers", id],
    queryFn: () => getQuestionAnswers(id),
    select: (data) => data.data,
  });
}
