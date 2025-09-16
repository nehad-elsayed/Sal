import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./components/Providers/AuthContextProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <Toaster />
          <ReactQueryDevtools />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
