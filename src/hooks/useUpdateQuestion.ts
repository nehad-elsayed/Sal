import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuestion } from "@/api/updateQuestion";
import useProfile from "@/hooks/useProfile";
import type { QuestionFormData } from "@/types/backend";
import toast from "react-hot-toast";

export default function useUpdateQuestion() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useProfile(); //& bn3rf byanat eluser 3shan n3rf ay profile hyt3mlo update

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: QuestionFormData }) => updateQuestion(id, data),
    onSuccess: (_, { id }) => {
      //update all questions
      queryClient.invalidateQueries({ queryKey: ["questions"] });

      //update question by id //elso2al elmo7dd
      queryClient.invalidateQueries({ queryKey: ["question", id] });

      //update user questions
      if (currentUser?.username) {
        queryClient.invalidateQueries({ queryKey: ["userQuestions", currentUser.username] });
      }

      toast.success("Question updated successfully");
    },
    onError: () => {
      toast.error("Failed to update question");
    },
  });
}
