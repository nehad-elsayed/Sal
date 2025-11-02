// curl --location -g '{{domain}}/api/upload' \
// --form 'file=@"/C:/Users/ahmed/Desktop/3D-HD-Nature-Images-Screen-Download.jpg"

import axiosInstance from ".";

export default function addUserPhoto(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return axiosInstance.post("/upload", formData);
}
