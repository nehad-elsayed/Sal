import type { Answer, Question } from "@/types/backend";
import { MessageCircle, ArrowUp, ArrowDown, User as UserIcon, Trash, Edit } from "lucide-react";
import useGetAnswers from "@/hooks/useGetAnswers";
import useDeleteAnswer from "@/hooks/useDeleteAnswer";
import useProfile from "@/hooks/useProfile";
import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import toast from "react-hot-toast";
import useAnswerVote from "@/hooks/useAnswerVote";

// "data": {
//   "downvotes": 0,
//   "id": 2,
//   "upvotes": 1,
//   "viewer_vote": true // true if upvote and false if downvote and null if hasn't voted
// },

export default function AnswerCard({
  questionId,
  question,
  setIsEditAnswer,
  setEditingAnswer,
}: {
  questionId: number;
  question: Question;
  setIsEditAnswer: (isEditAnswer: boolean) => void;
  setEditingAnswer: (answer: Answer | null) => void;
}) {
  const { data: answers, isLoading: answersLoading } = useGetAnswers(questionId);
  const { mutate: deleteAnswer } = useDeleteAnswer();
  const { data: currentUser } = useProfile();
  const { openModal } = useConfirmationModal();
  const { mutate: voteMutation } = useAnswerVote();
  const handleVote = (answerId: number, vote: number) => {
    voteMutation({ id: answerId, vote: vote });
    if (vote === 1) {
      toast.success("Voted up successfully");
    } else if (vote === 2) {
      toast.success("Voted down successfully");
    } else if (vote === 0) {
      toast.success("Removed vote successfully");
    }
  };
  const handleEditAnswer = (answer: Answer) => {
    setEditingAnswer(answer);
    setIsEditAnswer(true);
  };
  const handleDeleteAnswer = (answerId: number) => {
    openModal({
      title: "Are you sure?",
      message: "You won't be able to revert this!",
      confirmText: "Yes, delete it!",
      cancelText: "Cancel",
      onConfirm: () => {
        deleteAnswer(answerId);
        toast.success("Answer deleted successfully");
      },
    });
  };

  // التحقق من إمكانية حذف الإجابة
  const canDeleteAnswer = (answer: Answer) => {
    if (!currentUser) return false;
    // يمكن حذف الإجابة إذا كان المستخدم صاحب السؤال أو صاحب الإجابة
    return (
      currentUser.username === question.user.username ||
      currentUser.username === answer.user.username
    );
  };
  return (
    <>
      <div className="space-y-4 ">
        <h2 className="text-lg font-semibold text-gray-900">
          {answers?.data?.length || 0} Answer{(answers?.data?.length || 0) !== 1 ? "s" : ""}
        </h2>

        {answersLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading answers...</p>
          </div>
        ) : answers?.data && answers.data.length > 0 ? (
          answers.data.map((answer: Answer) => (
            <div
              key={answer.id}
              className="bg-white rounded-lg  shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4 relative ">
                <Edit
                  onClick={() => handleEditAnswer(answer)}
                  className="cursor-pointer text-blue-500 absolute top-1 right-7 size-4 hover:text-blue-700 transition-colors duration-200"
                />

                {canDeleteAnswer(answer) && (
                  <Trash
                    onClick={() => handleDeleteAnswer(answer.id)}
                    className="absolute cursor-pointer text-red-500 size-4 top-1 right-0 hover:text-red-700 transition-colors duration-200"/>
                )}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {answer.user?.avatar ? (
                      <img
                        src={answer.user?.avatar}
                        alt={answer.user.full_name?.charAt(0)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm font-semibold">
                        <UserIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{answer.user?.full_name}</p>
                    <p className="text-gray-500 text-xs">
                      {answer.user?.job || "No job available"}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {answer.created_at
                        ? new Date(answer.created_at).toLocaleDateString()
                        : "Recently"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-900 leading-relaxed  break-words">{answer.content}</p>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200">
                  <ArrowUp className="w-4 h-4" onClick={() => handleVote(answer.id, 1)} />
                  <span className="text-sm font-medium">{answer.upvotes || 0}</span>
                </button>

                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200">
                  <ArrowDown className="w-4 h-4" onClick={() => handleVote(answer.id, 2)} />
                  <span className="text-sm font-medium">{answer.downvotes || 0}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No answers yet</h3>
            <p className="text-gray-600">Be the first to answer this question!</p>
          </div>
        )}
      </div>
    </>
  );
}
