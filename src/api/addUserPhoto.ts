// curl --location -g '{{domain}}/api/upload' \
// --form 'file=@"/C:/Users/ahmed/Desktop/3D-HD-Nature-Images-Screen-Download.jpg"

import axiosInstance from ".";

export default function addUserPhoto(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  // axios automatically sets Content-Type: multipart/form-data with boundary
  // when sending FormData, so we don't need to set it manually
  return axiosInstance.post("/upload", formData);
}
