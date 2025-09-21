import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./components/Providers/AuthContextProvider";
import QueryProvider from "./components/Providers/QueryProvider";


function App() {
  return (
    <>
      <QueryProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthContextProvider>
      </QueryProvider>
    </>
  );
}

export default App;
