import type { Question, Answer } from "@/types/backend";
import AnswerCard from "../AnswerCard/AnswerCard";
import AnswerForm from "../Forms/AnswerForm";





export default function AnswerSection({ questionId, question, setEditingAnswer, isEditAnswer, setIsEditAnswer, editingAnswer }: { questionId: number, question: Question, setEditingAnswer: (answer: Answer | null) => void, isEditAnswer: boolean, setIsEditAnswer: (isEditAnswer: boolean) => void, editingAnswer: Answer | null}) {

  return (
    <div>
        <AnswerForm
          isEditAnswer={isEditAnswer}
          setIsEditAnswer={setIsEditAnswer}
          editingAnswer={editingAnswer}
        />
        {/* Answers Section */}
        <AnswerCard
          questionId={questionId}
          question={question}
          setIsEditAnswer={setIsEditAnswer}
          setEditingAnswer={setEditingAnswer}
        />
    </div>
  )
}
