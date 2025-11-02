import { User } from "lucide-react";
import useQuestions from "@/hooks/useQuestions";
import type { Question } from "@/types/backend";
import LoadingLogo from "@/components/LoadingLogo";
import CreateQuestion from "@/components/CreateQuestion";
import { useNavigate } from "react-router-dom";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
export default function HomePage() {
  const navigate = useNavigate();
  const { data: questions, isLoading } = useQuestions();
  if (isLoading) {
    return <LoadingLogo />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <label htmlFor="create-question" className="text-primary font-semibold text-sm">
        *Create Question*{" "}
      </label>
      <CreateQuestion />
      {/* Profile Header Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        {/* Edit Profile Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="text-primary hover:text-[hsl(var(--primary-foreground))] font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
          >
            <User className="w-4 h-4" />
            <span>go to Profile</span>
          </button>
        </div>

        {/* Questions Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Questions ({questions?.data.length || 0})
          </h2>

          {/* Questions List */}
          {questions?.data.length && questions?.data.length > 0 && (
            <div className="space-y-4">
              {questions?.data.map((question: Question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
