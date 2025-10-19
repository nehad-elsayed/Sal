import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuestion } from "@/api/updateQuestion";
import type { QuestionFormData } from "@/types/backend";
import toast from "react-hot-toast";



export default function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: QuestionFormData }) => updateQuestion(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["question", id] });
      toast.success("Question updated successfully");
      },
    onError: () => {
      toast.error("Failed to update question");
    },
  });
}