import { questionsVote } from "@/api/questionsVote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProfile from "@/hooks/useProfile";

export default function useQuestionVote() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useProfile();

  return useMutation({
    mutationFn: ({ id, vote }: { id: number; vote: number }) => questionsVote(id, vote),
    onSuccess: (_, { id }) => {
      // تحديث قائمة الأسئلة العامة
      queryClient.invalidateQueries({ queryKey: ["questions"] });

      // تحديث السؤال المحدد
      queryClient.invalidateQueries({ queryKey: ["question", id] });

      // تحديث أسئلة المستخدم الحالي في البروفايل
      if (currentUser?.username) {
        queryClient.invalidateQueries({ queryKey: ["userQuestions", currentUser.username] });
      }
    },
  });
}
