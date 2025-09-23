import React from "react";
import { CheckCircle2 } from "lucide-react";
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "created" | "closed" | "deleted";
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const modalContent = {
    created: {
      title: "¡Permiso creado!",
      message: "El permiso de trabajo en alturas ha sido creado exitosamente.",
    },
    closed: {
      title: "¡Permiso cerrado!",
      message: "El permiso de trabajo en alturas ha sido cerrado exitosamente.",
    },
    deleted: {
      title: "¡Permiso eliminado!",
      message:
        "El permiso de trabajo en alturas ha sido eliminado exitosamente.",
    },
  };

  if (!isOpen) {
    return false;
  }

  const content = modalContent[type];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="size-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {content.title}
          </h2>
          <p className="text-gray-600 mb-6">{content.message}</p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium px-4 py-2 rounded-md hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
