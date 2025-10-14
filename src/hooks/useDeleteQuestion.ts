import { useMutation } from "@tanstack/react-query";
import { deleteQuestion } from "@/api/deleteQuestion";
import { useQueryClient } from "@tanstack/react-query";





export default function useDeleteQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}