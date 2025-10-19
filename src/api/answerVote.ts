



import axiosInstance from ".";

export function answerVote(id: number, vote: number) {
  return axiosInstance.post(`/answers/${id}/vote`, { vote });
}