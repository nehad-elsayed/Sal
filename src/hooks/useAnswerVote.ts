import { answerVote } from "@/api/answerVote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useAnswerVote() {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || "0");
  return useMutation({
    mutationFn: ({ id, vote }: { id: number; vote: number }) => answerVote(id, vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers", questionId] });
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
  });
}
