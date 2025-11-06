import type { Notifications } from "@/types/backend";
import axiosInstance from ".";

export function getUserNotifications() {
  return axiosInstance.get<{ data:Notifications[]}>("/notifications", {
    params: {
      page: 1,
    },
  });
}
