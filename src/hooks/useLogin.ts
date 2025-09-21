import axiosInstance from "@/api";
import { AuthContext } from "@/components/Contexts/AuthContext";
import type { LoginData, LoginResponse } from "@/types/backend";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";

function login(loginData: LoginData) {
  return axiosInstance.post<LoginResponse>("/login", loginData);
}

export default function useLogin() {
  const { onLogin } = useContext(AuthContext) as {
    onLogin: (token: string) => void;
  };
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      onLogin(data.data.token);
      toast.success("Login successfully");
      navigate("/");
    },
  
  });
}
