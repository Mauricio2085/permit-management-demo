import React from "react";
import type { CloseEliminateModalProps } from "@/types/workAtHeights";
import { CheckSquare } from "lucide-react";

const ClosePermissionModal: React.FC<CloseEliminateModalProps> = ({
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
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-sm md:max-w-md mx-auto">
        <div className="flex flex-col items-center text-center">
          <CheckSquare className="size-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¿Cerrar permiso?
          </h2>
          <p className="text-gray-600 mb-6">
            ¿Estás seguro de que deseas cerrar el permiso de trabajo{" "}
            <span className="font-bold">#{permissionSequence}</span>?
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={() => onClose(false)}
              className="w-1/2 px-4 py-2 bg-gradient-to-r from-gray-500 to-sst-gray rounded-md border border-gray-300 text-white font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="w-1/2 bg-gradient-to-r from-green-500 to-sst-green text-white font-medium px-4 py-2 rounded-md hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Confirmar <span className="hidden md:inline-block">cierre</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ClosePermissionModal };
