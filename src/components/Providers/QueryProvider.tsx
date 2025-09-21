import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useMemo } from "react";
import toast from "react-hot-toast";

// 3shan a5ally no3 elerror axios error bgeeb el code da mn tanstack query mn typescript .
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<{ message: string }>;
  }
} //declare btsa3dny a3ml override 3la type mo3yn

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useMemo(() => {
    function showError(error: AxiosError<{ message: string }>) {
      // تجنب عرض رسائل 401 لأن interceptor سيتعامل معها
      //interceptor => من فايل اندكس تي اس جوا ال فولدر ال api
      if (error.response?.status === 401) {
        return; // لا تعرض رسالة خطأ لـ 401
      }

      const msg: string = error.response?.data.message || "An error occurred";
      toast.error(msg);
    } //bdal ma akrr ellogic bta3 el error 7teto  function

    //general setting lma y7sal error for all the project : y3ny ay error hy7sal hyzhar nafs el nateega sawa2 f el mutation aw el query
    const queryCache = new QueryCache({
      onError: (error) => {
        showError(error);
      },
    });

    const mutationCache = new MutationCache({
      onError: (error) => {
        showError(error);
      },
    });

    const queryClient = new QueryClient({
      queryCache,
      mutationCache,
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 100000,
        },
      },
    });
    return queryClient;
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
