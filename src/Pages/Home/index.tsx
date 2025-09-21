import { useState } from "react";
import {
  Edit3,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import useQuestions from "@/hooks/useQuestions";
import type { Question } from "@/types/backend";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: questions} = useQuestions();




  return (
  
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          {/* Edit Profile Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary hover:text-blue-700 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>

         

        
        {/* Questions Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Questions ({questions?.data.length || 0})</h2>

          {/* Questions List */}
          {questions?.data.length && questions?.data.length > 0 ? (
            <div className="space-y-4">
              {questions?.data.map((question : Question) => (
                <div
                  key={question.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Asker Info */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={question.user.avatar}
                          alt={question.user.full_name.charAt(0)}
                          className="w-full h-full object-cover"
                       
                        />
                        <div className="w-full h-full bg-gray-300 items-center justify-center text-gray-500 text-sm font-semibold hidden">
                          {question.user.full_name?.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {question.user.full_name}
                        </p>
                        <p className="text-gray-500 text-xs">
                              {question.user.job || "No job available"}
                            </p>
                      </div>
                    </div>

                    {/* Options Menu */}
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
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
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {question.upvotes || 0}
                        </span>
                      </button>

                      {/* Downvotes */}
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200">
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {question.downvotes || 0}
                        </span>
                      </button>

                      {/* Comments */}
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors duration-200">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {question.answers_count || 0}
                        </span>
                      </button>
                    </div>

                    {/* Timestamp */}
                    <p className="text-gray-500 text-sm">
                      {question.created_at
                        ? new Date(question.created_at).toLocaleDateString()
                        : "Recently"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm font-bold">
              No questions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
