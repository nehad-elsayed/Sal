import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnswer } from "@/api/updateAnswer";

export default function useUpdateAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { content: string } }) => updateAnswer(id, data),
    onSuccess: () => {
      // تحديث استعلامات الإجابات للأسئلة المختلفة
      queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
  });
}
