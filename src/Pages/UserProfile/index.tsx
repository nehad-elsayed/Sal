import { useState } from "react";
import { Edit3 } from "lucide-react";
import useProfile from "@/hooks/useProfile";
import useUserQuestions from "@/hooks/useUserQuestions";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import {
  ProfileModal,
  ProfileSkeleton,
} from "@/components/ProfileModalAttachments/ProfileModalAttachments";

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: profileData, isLoading, error } = useProfile();
  const {
    data: questions,
    isLoading: questionsLoading,
    error: questionsError,
  } = useUserQuestions(profileData?.username || "");
  function OpenModal() {
    setIsEditing(!isEditing);
    setIsOpenModal(true);
  }

  if (isLoading) {
    return <ProfileSkeleton />;
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
              onClick={() => OpenModal()}
              className="text-primary hover:text-blue-700 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            {isOpenModal && (
              <ProfileModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
            )}
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
            <p className="text-gray-500 text-sm mb-4">{profileData?.job || "No job available"}</p>

            {/* Bio */}
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
              {profileData?.bio || "No bio available"}
            </p>

            {/* User Statistics */}
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{questions?.length || 0}</p>
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
            Questions ({questions?.length || 0})
          </h2>

          {/* Questions List */}
          {questionsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading questions...</p>
            </div>
          ) : questionsError ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading questions</p>
            </div>
          ) : questions && questions.length > 0 ? (
            <div className="space-y-6">
              {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
              <p className="text-gray-600">This user hasn't asked any questions yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
