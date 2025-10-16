import ConfirmationModalContext from "@/components/Contexts/ConfirmationModalContext";
import { useContext } from "react";

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error("useConfirmationModal must be used within a ConfirmationModalProvider");
  }
  return context;
};
