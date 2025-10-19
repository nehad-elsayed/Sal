import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import type { Question, QuestionFormData } from "@/types/backend";
import useUpdateQuestion from "@/hooks/useUpdateQuestion";

export default function EditModal({
  isOpen,
  setIsOpen,
  question,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  question: Question;
}) {
  const { mutate: updateQuestion } = useUpdateQuestion();
  const { register, handleSubmit } = useForm<QuestionFormData>({
    defaultValues: {
      content: question.content,
    },
  });
  if (!isOpen) return null;
  const onSubmit = (data: QuestionFormData) => {
    updateQuestion({ id: question.id, data });
    setIsOpen(false);
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white flex flex-col rounded-lg w-3/4 md:w-1/2 shadow-sm border border-gray-200 p-6">
          <h1 className="text-primary font-bold text-lg mb-4">Edit Question</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input {...register("content")} type="text" placeholder="Question" />
            <div className="flex justify-end gap-2 w-fit ms-auto">
              <Button type="submit">
                Update Question
              </Button>
              <Button type="button" variant="destructive" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
