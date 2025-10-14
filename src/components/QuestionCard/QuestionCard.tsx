import useDeleteQuestion from "@/hooks/useDeleteQuestion";
import useQuestionVote from "@/hooks/useQuestionVote";
import useProfile from "@/hooks/useProfile";
import type { Question } from "@/types/backend";
import { MessageCircle, ArrowUp, ArrowDown, Trash } from "lucide-react";
import toast from "react-hot-toast";

//  {

//   vote: 1 // can be 0, 1 or 2. 0 for removing vote, 1 for upvote and 2 for downvote
// }

export default function QuestionCard({ question }: { question: Question }) {
  const { mutate: voteMutation } = useQuestionVote();
  const { mutate: deleteMutation } = useDeleteQuestion();
  const { data: currentUser } = useProfile();

  // التحقق من أن المستخدم الحالي هو صاحب السؤال
  const isOwner = currentUser?. username === question.user.username;
  const handleVote = (vote: number) => {
    voteMutation({ id: question.id, vote });
    if (vote === 1) {
      toast.success("Voted successfully");
    } else if (vote === 2) {
      toast.success("Un voted successfully");
    }
  };
  const handleDelete = () => {
    deleteMutation(question.id);
    toast.success("Question deleted successfully");
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        {/* Asker Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {question.user.avatar ? (
              <img
                src={question.user.avatar}
                alt={question.user.full_name.charAt(0)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm font-semibold">
                {question.user.full_name?.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">{question.user.full_name}</p>
            <p className="text-gray-500 text-xs">{question.user.job || "No job available"}</p>
          </div>
        </div>

        {/* Delete Question - يظهر فقط إذا كان المستخدم هو صاحب السؤال */}
        {isOwner && (
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            title="Delete Question"
          >
            <Trash className="w-5 h-5 text-red-500" />
          </button>
        )}
      </div>

      {/* Question Text */}
      <div className="mb-4">
        <p className="text-gray-900 text-base leading-relaxed overflow-hidden text-ellipsis whitespace-nowrap">
          {question.content || "No question available"}
        </p>
      </div>

      {/* Interaction Metrics */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Upvotes */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200">
            vote <ArrowUp className="w-4 h-4" onClick={() => handleVote(1)} />
            <span className="text-sm font-medium">{question.upvotes || 0}</span>
            {question.viewer_vote === "1" && <span className="text-sm font-medium">You voted</span>}
          </button>

          {/* Downvotes */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200">
            <ArrowDown className="w-4 h-4" onClick={() => handleVote(2)} />
            <span className="text-sm font-medium">{question.downvotes || 0}</span>
            {question.viewer_vote === "2" && <span className="text-sm font-medium">You voted</span>}
          </button>

          {/* Comments */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors duration-200">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{question.answers_count || 0}</span>
          </button>
        </div>

        {/* Timestamp */}
        <p className="text-gray-500 text-sm">
          {question.created_at ? new Date(question.created_at).toLocaleDateString() : "Recently"}
        </p>
      </div>
    </div>
  );
}
