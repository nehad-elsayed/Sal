import { useParams } from "react-router-dom";
import useQuestion from "@/hooks/useQuestion";
import useGetAnswers from "@/hooks/useGetAnswers";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import type { Answer } from "@/types/backend";
import { MessageCircle, ArrowUp, ArrowDown, User } from "lucide-react";
import { useState } from "react";
import LoadingLogo from "@/components/LoadingLogo";
import { useQueryClient } from "@tanstack/react-query";

export default function QuestionDetails() {
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || "0");

  const { data: question, isLoading: questionLoading } = useQuestion(questionId);
  const { data: answers, isLoading: answersLoading } = useGetAnswers(questionId);
  const queryClient = useQueryClient();
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answerContent, setAnswerContent] = useState("");

  const handleSubmitAnswer = () => {
    // TODO: Implement answer submission
    console.log("Submitting answer:", answerContent);
    setAnswerContent("");
    setShowAnswerForm(false);
    queryClient.invalidateQueries({ queryKey: ["answers", questionId] });
  };

  if (questionLoading) {
    return <LoadingLogo />;
  }

  if (!question?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Question Not Found</h1>
          <p className="text-gray-600">The question you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Question Section */}
        <div className="mb-6">
          <QuestionCard question={question.data} />
        </div>

        {/* Answer Form */}
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
            <div className="space-y-4">
              <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="Write your answer here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAnswerForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!answerContent.trim()}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Post Answer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Answers Section */}
        <div className="space-y-4">
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
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
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
                          <User className="w-5 h-5" />
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
                  <p className="text-gray-900 leading-relaxed">{answer.content}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200">
                    <ArrowUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{answer.upvotes || 0}</span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200">
                    <ArrowDown className="w-4 h-4" />
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
      </div>
    </div>
  );
}
