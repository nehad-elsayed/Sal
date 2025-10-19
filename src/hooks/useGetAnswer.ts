import { getAnswer } from "@/api/getAnswer";
import { useQuery } from "@tanstack/react-query";

export default function useGetAnswer(id: number) {
  return useQuery({
    queryKey: ["answer", id],
    queryFn: () => getAnswer(id),
    select: (data) => data.data,
  });
}
