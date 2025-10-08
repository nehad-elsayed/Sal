import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api";
import { toast } from "react-hot-toast";

type FormData = {
  content: string;
};

export default function CreateQuestion() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const queryClient = useQueryClient();

  const { mutate: createQuestion, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      return axiosInstance.post("/questions", data);
    },
    onSuccess: () => {
      // تحديث قائمة الأسئلة تلقائياً
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question created successfully!");
      reset(); // مسح النموذج
    },
    onError: () => {
      toast.error("Failed to create question");
    },
  });

  const onSubmit = (data: FormData) => {
   if(data.content.trim()) {
    createQuestion(data);
   } else {
    toast.error("Question cannot be empty");
   }
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center  gap-2 my-4"
          id="create-question"
        >
          <Input
            {...register("content")}
            type="text"
            placeholder="Create Question"
            className="text-neutral-700 font-semibold w-full min-h-20 caret-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button type="submit" className="ms-auto w-fit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Question"}
          </Button>
        </form>
      </div>
    </>
  );
}
