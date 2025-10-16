import { useConfirmationModal } from  "@/hooks/useConfirmationModal";

export default function ConfirmationModal() {
  const { isOpen, title, message, confirmText, cancelText, onConfirm, onCancel } =
    useConfirmationModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white flex flex-col rounded-lg w-3/4 md:w-1/2 shadow-sm border border-gray-200 p-6">
        <h1 className="text-primary font-bold text-lg mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
