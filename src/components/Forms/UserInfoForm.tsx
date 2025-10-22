import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import useProfile from "@/hooks/useProfile";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import updateProfile from "@/api/updateProfile";

type UserInfoFormValues = {
  full_name: string;
  username: string;
  bio: string;
  job: string;
};

export default function UserInfoForm({ onCancel }: { onCancel: () => void }) {
  const { data: profileData } = useProfile();
  const queryClient = useQueryClient();

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
