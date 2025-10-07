import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary/index.tsx";
import ErrorFallback from "./components/ErrorBoundary/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
