import axiosInstance from ".";

export function questionsVote(id: number, vote: number) {
  return axiosInstance.post(`/questions/${id}/vote`, { vote });
}
