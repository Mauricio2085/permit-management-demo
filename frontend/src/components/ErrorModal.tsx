import React from "react";
import { XCircle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type CloseFunction = Dispatch<SetStateAction<boolean>> | (() => void);

interface ErrorModalProps {
  isOpen: boolean;
  onClose: CloseFunction;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center text-center">
          <XCircle className="size-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Ocurrió un error!
          </h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={() => {
              if (typeof onClose === "function") {
                if (onClose.length === 1) {
                  (onClose as Dispatch<SetStateAction<boolean>>)(false);
                } else {
                  (onClose as () => void)();
                }
              }
            }}
            className="w-full bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
