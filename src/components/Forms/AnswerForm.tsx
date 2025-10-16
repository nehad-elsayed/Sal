import useCreateAnswer from "@/hooks/useCreateAnswer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AnswerForm() {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const { mutate: createAnswer } = useCreateAnswer();
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || "0");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const content = watch("content"); // watch the content field lw empty aw is submitting bt3tl elbutton
  //instead of ma a3mel if condition lw elcontent empty b3d el trim() mtb3tsh request aw 5aly elbutton disalbed
  const onSubmit = (data: { content: string }) => {
    createAnswer({ content: data.content, question_id: questionId });
    reset();
    setShowAnswerForm(false);
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h2>
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
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content?.trim() || isSubmitting}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? "Posting..." : "Post Answer"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
