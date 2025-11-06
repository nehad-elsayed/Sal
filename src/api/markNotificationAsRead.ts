import axiosInstance from ".";

export function markNotificationAsRead(notificationId: number) {
  return axiosInstance.post(`/notifications/${notificationId}/set-read`);
}
