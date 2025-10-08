import { useEffect, useState } from "react";
import { Edit3, ThumbsUp, ThumbsDown, MessageCircle, MoreVertical } from "lucide-react";
import useProfile from "@/hooks/useProfile";
import type { Question } from "@/types/backend";
import axiosInstance from "@/api";

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: profileData, isLoading, error } = useProfile();
  const [questions, setQuestions] = useState<Question[]>([]);

  function getuserQuestions(id: number) {
    return axiosInstance.get<{ data: Question[] }>(`/questions/${id}`);
  }
  useEffect(() => {
    if (profileData?.id) {
      getuserQuestions(profileData.id)
        .then((res) => {
          console.log(res.data.data);
          setQuestions(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user questions:", error);
          // لا تعرض رسالة خطأ هنا لأن interceptor سيتعامل مع 401
        });
    }
  }, [profileData?.id]);

  if (isLoading) {
   return <ProfileSkeleton/>
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-red-600">Error loading profile data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
          {/* Avatar  */}
          <div className="w-24 h-24 mx-auto my-2 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-white shadow-sm flex items-center justify-center">
            {profileData?.avatar ? (
              <img
                src={profileData.avatar}
                alt={profileData.full_name.charAt(0)}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Hide image and show initials if image fails to load
                  e.currentTarget.style.display = "none";
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = "flex";
                  }
                }}
              />
            ) : null}
            <div
              className={`w-full h-full flex items-center justify-center text-2xl font-bold text-blue-600 ${
                profileData?.avatar ? "hidden" : "flex"
              }`}
              style={{ display: profileData?.avatar ? "none" : "flex" }}
            >
              {profileData?.full_name.substring(0, 2).toUpperCase()}
            </div>
          </div>

          {/* User Information */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-1">@{profileData?.username}</p>
            <h1 className="text-2xl font-bold text-gray-900 capitalize mb-2">
              {profileData?.full_name}
            </h1>
            <p className="text-gray-500 text-sm mb-4">{profileData?.job ||"No job available"}</p>

            {/* Bio */}
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
              {profileData?.bio || "No bio available"}
            </p>

            {/* User Statistics */}
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {profileData?.questions_count || questions.length}
                </p>
                <p className="text-gray-500 text-sm">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{profileData?.answers_count || 0}</p>
                <p className="text-gray-500 text-sm">Answers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Questions ({profileData?.questions_count || questions.length})
          </h2>

          {/* Questions List */}
          {questions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {questions.map((question: Question) => (
                <div
                  key={question.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Asker Info */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-white shadow-sm">
                        <img
                          src={question.user.avatar}
                          alt={question.user.full_name.charAt(0)}
                          className="w-full h-full object-cover"
                        />
                        <div className="w-full capitalize h-full bg-gradient-to-br from-blue-400 to-purple-400 items-center justify-center text-white text-sm font-semibold hidden">
                          {question.user.full_name?.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm capitalize">
                          {question.user.full_name}
                        </p>
                        <p className="text-gray-500 text-xs capitalize">
                          {question.user.job ? question.user.job : null}
                        </p>
                      </div>
                    </div>

                    {/* Options Menu */}
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Question Text */}
                  <div className="mb-6">
                    <p className="text-gray-900 text-base leading-relaxed font-medium">
                      {question.content || "No question available"}
                    </p>
                  </div>

                  {/* Interaction Metrics */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      {/* Upvotes */}
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group/btn">
                        <div className="p-1 rounded-full group-hover/btn:bg-green-50">
                          <ThumbsUp className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{question.upvotes || 0}</span>
                      </button>

                      {/* Downvotes */}
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 group/btn">
                        <div className="p-1 rounded-full group-hover/btn:bg-red-50">
                          <ThumbsDown className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{question.downvotes || 0}</span>
                      </button>

                      {/* Comments */}
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200 group/btn">
                        <div className="p-1 rounded-full group-hover/btn:bg-blue-50">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{question.answers_count || 0}</span>
                      </button>
                    </div>

                    {/* Timestamp */}
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">
                        {question.created_at
                          ? new Date(question.created_at).toLocaleDateString("ar-EG", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Recently"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm font-bold">No questions yet</div>
          )}
        </div>
      </div>
    </div>
  );
}


function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="animate-pulse">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            </div>
            <div className="text-center">
              <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-40 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}