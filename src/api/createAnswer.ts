// {
//   "content": "yup",
//   "question_id": 547
// }

import axiosInstance from ".";

export default function createAnswer(data: { content: string; question_id: number }) {
  return axiosInstance.post("/answers", data);
}
