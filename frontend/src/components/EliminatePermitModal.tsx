import React from "react";
import type { CloseEliminateModalProps } from "@/types/workAtHeights";
import { XCircle } from "lucide-react";

const EliminatePermissionModal: React.FC<CloseEliminateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  permissionSequence,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center text-center">
          <XCircle className="size-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¿Eliminar permiso?
          </h2>
          <p className="text-gray-600 mb-6">
            ¿Estás seguro de que deseas eliminar el permiso de trabajo{" "}
            <span className="font-bold">#{permissionSequence}</span>? Esta
            acción es irreversible.
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={() => onClose(false)}
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="w-1/2 bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EliminatePermissionModal };
