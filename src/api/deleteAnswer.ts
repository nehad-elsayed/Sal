//  DELETE '{{domain}}/api/answers/1'

import axiosInstance from ".";

export default function deleteAnswer(id: number) {
  return axiosInstance.delete(`/answers/${id}`);
}
