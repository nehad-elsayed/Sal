import { useParams } from "react-router-dom";
import useQuestion from "@/hooks/useQuestion";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import LoadingLogo from "@/components/LoadingLogo";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Answer } from "@/types/backend";
import AnswerSection from "@/components/AnswerSection/AnswerSection";

export default function QuestionDetails() {
  const { id } = useParams<{ id: string }>();
  const questionId = parseInt(id || "0");
  const navigate = useNavigate();
  const { data: question, isLoading: questionLoading } = useQuestion(questionId);
  const [isEditAnswer, setIsEditAnswer] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState<Answer | null>(null);
  if (questionLoading) {
    return <LoadingLogo />;
  }

  if (!question?.data || !question) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Question Not Found</h1>
          <p className="text-gray-600">The question you're looking for doesn't exist.</p>
        </div>

        <Button onClick={() => navigate("/")} variant="outline">
          Go to Home
        </Button>
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
       <AnswerSection questionId={questionId} question={question.data} setEditingAnswer={setEditingAnswer} isEditAnswer={isEditAnswer} setIsEditAnswer={setIsEditAnswer} editingAnswer={editingAnswer} />
      </div>
    </div>
  );
}
