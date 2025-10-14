import { questionsVote } from "@/api/questionsVote";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useQuestionVote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, vote }: { id: number; vote: number }) => questionsVote(id, vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}
