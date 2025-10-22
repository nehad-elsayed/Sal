import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProfile from "./useProfile";
import type { QuestionFormData } from "@/types/backend";
import addNewQuestion from "@/api/createQuestion";





export default function useCreateQuestion() {

const queryClient = useQueryClient();
const { data: currentUser } = useProfile();

  return useMutation({
    mutationFn: (data: QuestionFormData) => {
      return addNewQuestion(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      if (currentUser?.username) {
        queryClient.invalidateQueries({ queryKey: ["userQuestions", currentUser.username] });
      }
    },
  
  })
}