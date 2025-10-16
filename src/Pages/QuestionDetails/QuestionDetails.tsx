import { useParams } from "react-router-dom";
import useQuestion from "@/hooks/useQuestion";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import LoadingLogo from "@/components/LoadingLogo";

import AnswerForm from "@/components/Forms/AnswerForm";
import AnswerCard from "@/components/AnswerCard/AnswerCard";

export default function QuestionDetails() {
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || "0");

  const { data: question, isLoading: questionLoading } = useQuestion(questionId);

  if (questionLoading) {
    return <LoadingLogo />;
  }

  if (!question?.data || !question) {
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
        <AnswerForm />
        {/* Answers Section */}
        <AnswerCard questionId={questionId} question={question.data} />
      </div>
    </div>
  );
}
