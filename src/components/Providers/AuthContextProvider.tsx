import axiosInstance from "@/api";
import {
  getLocalStorageToken,
  removeLocalStorageToken,
  setLocalStorageToken,
} from "@/utils/LocalStorageToken";
import { useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";


//bdal ma a3ml el provider m3 el create context f file wa7ed bfsl el provider
export default function AuthContextProvider ({children}: {children: React.ReactNode}) {
  const [token, setToken] = useState<string | null>(getLocalStorageToken());
  const [isAuth, setIsAuth] = useState<boolean>(!!token);


  //instead of using it more than one time i can use this function
  function setAxiosToken(token: string | undefined) {
   return axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  function onLogin(tokenData: string) {
    setToken(tokenData);
    setIsAuth(true);
    setAxiosToken(tokenData);
    setLocalStorageToken(tokenData);
  }

  function onLogout() {
    setToken(null);
    setIsAuth(false);
    setAxiosToken(undefined);
    removeLocalStorageToken();
  }

  //to check in the first render if i have token in local storage or not 
  useEffect(() => {
    const LocalStorageToken = getLocalStorageToken();
    if (LocalStorageToken) {
      setToken(LocalStorageToken);
      setIsAuth(true);
    }
  }, []);

    return (
    <AuthContext.Provider value={{ isAuth, onLogin, onLogout }}>
      {children }
    </AuthContext.Provider>
 
  );
};


