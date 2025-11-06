import addUserPhoto from "@/api/addUserPhoto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProfile from "./useProfile";

export default function useAddUserPhoto() {
  const { data: currentUser } = useProfile();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (file: File) => addUserPhoto(file),
    onSuccess: (response) => {
      // Log the response to debug
      console.log("Upload response:", response);

      // Invalidate and refetch profile data with a small delay to ensure backend has updated
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      // Wait a bit before refetching to ensure backend has processed the upload
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["profile"] });
      }, 500);

      if (currentUser?.username) {
        queryClient.invalidateQueries({ queryKey: ["userQuestions", currentUser.username] });
      }
    },
  });

  return mutation;
}
