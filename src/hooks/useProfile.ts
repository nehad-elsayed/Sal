import axiosInstance from "@/api";
import { AuthContext } from "@/components/Contexts/AuthContext";
import type { User } from "@/types/backend";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";



function getUserProfile() {
  return axiosInstance.get<{ data: User }>("/profile");
}

export default function useProfile() {
  const { isAuth  } = useContext(AuthContext) as { isAuth: boolean };
  return useQuery({
    queryKey: ["profile"],
    refetchOnWindowFocus: true,
    queryFn: getUserProfile,
    select: (data) => data.data.data,
    enabled: isAuth, //m3naha ash8l el query wlla la f btsht8l lw feeh token y3ny eluser 3aml login w lw mfesh msh htsht8l
  });
}
