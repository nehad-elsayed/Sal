


// '{{domain}}/api/questions/1'

import axiosInstance from ".";

export function deleteQuestion(id: number) {
  return axiosInstance.delete(`/questions/${id}`);
}
