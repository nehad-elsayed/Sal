import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "@/api/deleteQuestion";
import useProfile from "@/hooks/useProfile";

export default function useDeleteQuestion() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useProfile();

  return useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      // تحديث قائمة الأسئلة العامة
      queryClient.invalidateQueries({ queryKey: ["questions"] });

      // تحديث أسئلة المستخدم الحالي في البروفايل
      if (currentUser?.username) {
        queryClient.invalidateQueries({ queryKey: ["userQuestions", currentUser.username] });
      }
    },
  });
}
