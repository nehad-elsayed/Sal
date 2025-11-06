import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "@/api/markNotificationAsRead";

export default function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => markNotificationAsRead(notificationId),
    onSuccess: () => {
      // Invalidate and refetch notifications to update the UI
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      // Silent error - we don't want to show error toast for this
      console.error("Failed to mark notification as read");
    },
  });
}
