import deleteAnswer from "@/api/deleteAnswer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useDeleteAnswer() {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || "0");
  return useMutation({
    mutationFn: (id: number) => deleteAnswer(id),
    onSuccess: () => {
      // تحديث cache الإجابات
      queryClient.invalidateQueries({ queryKey: ["answers", questionId] });
      // تحديث cache السؤال ليتحدث عدد الإجابات
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
      // تحديث cache جميع الأسئلة ليتحدث عدد الإجابات في القائمة الرئيسية
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}
