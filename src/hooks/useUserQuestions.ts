import { useQuery } from "@tanstack/react-query";
import { getUserQuestions } from "@/api/getUserQuestions";

export default function useUserQuestions(userName: string) {
  return useQuery({
        queryKey: ["userQuestions", userName],
        queryFn: () => getUserQuestions(userName),
    select: (data) => {
      // Ensure we return an array even if data is undefined
      return data?.data?.data || [];
    },
    enabled: !!userName, 
  });
}
