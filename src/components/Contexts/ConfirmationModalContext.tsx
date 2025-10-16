import { createContext } from "react";

interface ConfirmationModalContextType {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  openModal: (config: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  }) => void;
  closeModal: () => void;
}

const ConfirmationModalContext = createContext<ConfirmationModalContextType | undefined>(undefined);



export default ConfirmationModalContext;
