import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./components/Providers/AuthContextProvider";
import QueryProvider from "./components/Providers/QueryProvider";
import I18nProvider from "./components/Providers/I18nProvider";
import ConfirmationModalProvider from "./components/Providers/ConfirmationModalProvider";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";

function App() {
  return (
    <>
      <I18nProvider>
        <QueryProvider>
          <AuthContextProvider>
            <ConfirmationModalProvider>
              <RouterProvider router={router} />
              <Toaster />
              <ConfirmationModal />
            </ConfirmationModalProvider>
          </AuthContextProvider>
        </QueryProvider>
      </I18nProvider>
    </>
  );
}

export default App;
