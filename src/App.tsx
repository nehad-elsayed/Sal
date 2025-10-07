import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./components/Providers/AuthContextProvider";
import QueryProvider from "./components/Providers/QueryProvider";
import I18nProvider from "./components/Providers/I18nProvider";



function App() {

  return (
    <>
      <I18nProvider>
      <QueryProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthContextProvider>
      </QueryProvider>
      </I18nProvider>
    </>
  );
}

export default App;
