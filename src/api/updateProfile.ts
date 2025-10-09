import axiosInstance from ".";

type UpdateProfileData = {
  full_name?: string;
  username?: string;
  bio?: string;
  job?: string;
};

export default function updateProfile(data: UpdateProfileData) {
  return axiosInstance.patch("/profile", data);
}
