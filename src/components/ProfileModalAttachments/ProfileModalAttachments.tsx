import { ShieldCloseIcon } from "lucide-react";
import UserInfoForm from "../Forms/UserInfoForm";

export function ProfileSkeleton() {
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


export function ProfileModal({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
}) {
  if (!isOpenModal) return null;

  return (
    <div
      // onClick={() => setIsOpenModal(false)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white flex flex-col rounded-lg w-3/4 md:w-1/2 shadow-sm border border-gray-200 p-3"
      >
        <div className="flex justify-between my-3 items-center">
          <h1 className="text-primary font-bold ">Edit Profile</h1>
          <span className="cursor-pointer" onClick={() => setIsOpenModal(false)}>
            {" "}
            <ShieldCloseIcon className="w-6 h-6 text-primary" />{" "}
          </span>
        </div>
        <UserInfoForm onCancel={() => setIsOpenModal(false)} />
      </div>
    </div>
  );
}
