import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import useProfile from "@/hooks/useProfile";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import updateProfile from "@/api/updateProfile";
import useAddUserPhoto from "@/hooks/useAddUserPhoto";
import { useRef, useState } from "react";

type UserInfoFormValues = {
  full_name: string;
  username: string;
  bio: string;
  job: string;
};

export default function UserInfoForm({ onCancel }: { onCancel: () => void }) {
  const { data: profileData } = useProfile();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate: uploadPhoto, isPending: isUploadingPhoto } = useAddUserPhoto();
  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
      onCancel();
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const { register, handleSubmit, reset } = useForm<UserInfoFormValues>({
    defaultValues: {
      // full_name: profileData?.full_name || "",
      // username: profileData?.username || "",
      bio: profileData?.bio || "",
      job: profileData?.job || "",
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = () => {
    if (selectedFile) {
      uploadPhoto(selectedFile, {
        onSuccess: () => {
          toast.success("Photo uploaded successfully");
          setSelectedFile(null);
          setPreviewUrl(null);
        },
        onError: () => {
          toast.error("Failed to upload photo");
        },
      });
    }
  };

  function onSubmit(data: UserInfoFormValues) {
    updateProfileMutation({
      // full_name: data.full_name,
      // username: data.username,
      bio: data.bio,
      job: data.job,
    });
  }
  function handleCancel() {
    reset();
    onCancel();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Photo Upload Section */}
      <div className="flex my-2 flex-col gap-2">
        <Label>Profile Photo</Label>
        <div className="flex flex-col items-center gap-3">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-primary"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-2 border-gray-300">
              {profileData?.avatar ? (
                <img
                  src={profileData.avatar}
                  alt="Current"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-blue-600">
                  {profileData?.full_name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
          )}
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="text-sm border-primary text-primary hover:bg-primary hover:text-white rounded-full"
            >
              Choose Photo
            </Button>
            {selectedFile && (
              <Button
                type="button"
                onClick={handleUploadPhoto}
                disabled={isUploadingPhoto}
                className="text-sm bg-primary text-white hover:bg-blue-700 rounded-full"
              >
                {isUploadingPhoto ? "Uploading..." : "Upload"}
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex my-2 flex-col gap-2">
        <Label>Full Name</Label>
        <Input
          {...register("full_name")}
          className="border-primary  rounded-full outline-none focus:outline-none focus:ring-0"
          type="text"
        />
      </div>
      <div className="flex my-2 flex-col gap-2">
        <Label>User Name</Label>
        <Input
          {...register("username")}
          className="border-primary  rounded-full outline-none focus:outline-none focus:ring-0"
          type="text"
        />
      </div> */}
      <div className="flex my-2 flex-col gap-2">
        <Label>Job</Label>
        <Input
          {...register("job")}
          className="border-primary  rounded-full outline-none focus:outline-none focus:ring-0"
          type="text"
        />
      </div>
      <div className="flex my-2 flex-col gap-2">
        <Label>Bio</Label>
        <Input
          {...register("bio")}
          className=" rounded-full border-primary focus:border-none  outline-none focus:outline-none "
          type="text"
        />
      </div>
      <div className="flex justify-end p-2 gap-2">
        <Button
          type="submit"
          className="bg-primary my-2 text-white self-end mt-2 rounded-full"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          onClick={handleCancel}
          variant="destructive"
          className="text-white my-2  self-end mt-2  rounded-full"
        >
          cancel
        </Button>
      </div>
    </form>
  );
}
