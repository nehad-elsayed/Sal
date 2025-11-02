import useCreateAnswer from "@/hooks/useCreateAnswer";
import useUpdateAnswer from "@/hooks/useUpdateAnswer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { Answer } from "@/types/backend";
import toast from "react-hot-toast";

export default function AnswerForm({
  isEditAnswer,
  setIsEditAnswer,
  editingAnswer,
}: {
  isEditAnswer: boolean;
  setIsEditAnswer: (isEditAnswer: boolean) => void;
  editingAnswer?: Answer | null;
}) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const { mutate: createAnswer } = useCreateAnswer();
  const { mutate: updateAnswer } = useUpdateAnswer();
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || "0");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  // ملء النموذج ببيانات الإجابة المراد تعديلها
  useEffect(() => {
    if (isEditAnswer && editingAnswer) {
      setValue("content", editingAnswer.content);
      setShowAnswerForm(true);
    }
  }, [isEditAnswer, editingAnswer, setValue]);

  const content = watch("content"); // watch the content field lw empty aw is submitting bt3tl elbutton
  //instead of ma a3mel if condition lw elcontent empty b3d el trim() mtb3tsh request aw 5aly elbutton disalbed
  const onSubmit = (data: { content: string }) => {
    if (isEditAnswer && editingAnswer) {
// update the existing answer
      updateAnswer({ id: editingAnswer.id, data: { content: data.content } });
      toast.success("Answer updated successfully!");
      setIsEditAnswer(false);
      reset();
      setShowAnswerForm(false);
    } else {
      // create a new answer
      createAnswer({ content: data.content, question_id: questionId });
      reset();
      setShowAnswerForm(false);
    }
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isEditAnswer ? "Edit Answer" : "Your Answer"}
        </h2>
        {!showAnswerForm ? (
          <button
            onClick={() => setShowAnswerForm(true)}
            className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors duration-200"
          >
          Click here to write your answer...
          </button>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <textarea
                {...register("content")}
                placeholder="Write your answer here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAnswerForm(false);
                  reset();
                  if (isEditAnswer) {
                    setIsEditAnswer(false);
                  }
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content?.trim() || isSubmitting}
                className="px-6 py-2 bg-primary text-white hover:text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting
                  ? isEditAnswer
                    ? "Updating..."
                    : "Posting..."
                  : isEditAnswer
                  ? "Update Answer"
                  : "Add Answer"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
