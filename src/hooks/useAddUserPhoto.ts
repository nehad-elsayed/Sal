import addUserPhoto from "@/api/addUserPhoto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProfile from "./useProfile";

export default function useAddUserPhoto() {
  const { data: currentUser } = useProfile();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (file: File) => addUserPhoto(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (currentUser?.username) {
        queryClient.invalidateQueries({ queryKey: ["userQuestions", currentUser.username] });
      }
    },
  });

  return mutation;
}
