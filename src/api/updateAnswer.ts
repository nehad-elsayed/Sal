import axiosInstance from ".";

export function updateAnswer(id: number, data: { content: string }) {
  return axiosInstance.patch(`/answers/${id}`, data);
}