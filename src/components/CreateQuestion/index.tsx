import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { QuestionFormData } from "@/types/backend";
import useCreateQuestion from "@/hooks/useCreateQuestion";

export default function CreateQuestion() {
  const { register, handleSubmit, reset } = useForm<QuestionFormData>();
  const { mutate: createQuestion, isPending } = useCreateQuestion();
  const onSubmit = (data: QuestionFormData) => {
    if (data.content.trim()) {
      createQuestion(data);
      toast.success("Question created successfully!");
      reset();
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
          <Button type="submit" className="ms-auto w-fit text-white bg-primary hover:text-[hsl(var(--primary-foreground))] hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" disabled={isPending}>
            {isPending ? "Creating..." : "Create Question"}
          </Button>
        </form>
      </div>
    </>
  );
}
