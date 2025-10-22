import createAnswer from "@/api/createAnswer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useProfile from "./useProfile";
import toast from "react-hot-toast";

export default function useCreateAnswer() {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || "0");
  const { data: profileData } = useProfile(); //& bn3rf byanat eluser 3shan n3rf ay profile hyt3mlo update
  if (profileData?.username) {
    queryClient.invalidateQueries({ queryKey: ["userQuestions", profileData.username] });
  }
  return useMutation({
    mutationFn: (data: { content: string; question_id: number }) => createAnswer(data),
    onSuccess: () => {
      toast.success("Answer created successfully");
      // تحديث cache الإجابات
      queryClient.invalidateQueries({ queryKey: ["answers", questionId] });
      // تحديث cache السؤال ليتحدث عدد الإجابات
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
      // تحديث cache جميع الأسئلة ليتحدث عدد الإجابات في القائمة الرئيسية
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}
