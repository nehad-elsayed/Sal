import { useState, type ReactNode } from "react";
import ConfirmationModalContext from "../Contexts/ConfirmationModalContext";

interface ConfirmationModalProviderProps {
  children: ReactNode;
}

export default function ConfirmationModalProvider({ children }: ConfirmationModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [confirmText, setConfirmText] = useState("Yes, delete it!");
  const [cancelText, setCancelText] = useState("Cancel");
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const openModal = (config: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  }) => {
    setTitle(config.title);
    setMessage(config.message);
    setConfirmText(config.confirmText || "Yes, delete it!");
    setCancelText(config.cancelText || "Cancel");
    setOnConfirm(() => config.onConfirm);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setMessage("");
    setConfirmText("Yes, delete it!");
    setCancelText("Cancel");
    setOnConfirm(null);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const value = {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
    openModal,
    closeModal,
  };

  return (
    <ConfirmationModalContext.Provider value={value}>{children}</ConfirmationModalContext.Provider>
  );
}
