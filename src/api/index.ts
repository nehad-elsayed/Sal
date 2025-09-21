import axios from "axios";
import toast from "react-hot-toast";

const apiURL: string | null = import.meta.env.VITE_API_URL;

if (!apiURL) {
  throw new Error("VITE_API_URL is not defined");
}

const axiosInstance = axios.create({
  baseURL: apiURL,
});

// إضافة interceptor للتعامل مع أخطاء 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // إزالة الـ token من localStorage
      localStorage.removeItem("sal_token");
      toast.error("Unauthorized Please Login Again !");
      // إعادة توجيه إلى صفحة تسجيل الدخول أو إعادة تحميل الصفحة
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
// axiosInstance.interceptors.request.use((response)=>response.data); => // السطر ده عشان احدد الداتا اللي راجعه م الباك اند عشان مثلا لو مش مستخدمه يوز كويري وعامله سيليكت م الريسبونس

export default axiosInstance;
