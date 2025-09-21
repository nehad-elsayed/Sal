import axiosInstance from "@/api";
import { AuthContext } from "@/components/Contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

function logout() {
  return axiosInstance.delete("/logout");
}

export default function useLogout() {
  const { onLogout } = useContext(AuthContext) as { onLogout: () => void };
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      // da esmo optimistic update => 3shan bb2a mot2kd en elrequest hyng7
      onLogout(); //from authContext hnsh8lha el awal w b3den nb3t ll back end en el user 3ml logout
    await  logout(); //calling api
    },
  });
}
