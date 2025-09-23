// Componente para descargar
import type { PermissionDownloadResponse } from "@/types/workAtHeights";
import { CompletedPermissionPdfDocument } from "@/components/CompletedPermissionPdfDocument";
import { PendingPermissionPdfDocument } from "@/components/PendingPermissionPdfDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";

interface PdfDocumentProps {
  data: PermissionDownloadResponse["data"][0];
  type: string;
}

const PermissionDownloadPdfButton: React.FC<PdfDocumentProps> = ({
  data,
  type,
}) => {
  console.log("Data pasada al botoón PDF: ", data);

  return (
    <PDFDownloadLink
      document={
        type === "complete" ? (
          <CompletedPermissionPdfDocument data={data} />
        ) : (
          <PendingPermissionPdfDocument data={data} />
        )
      }
      fileName={`permiso-trabajo-alturas-pendiente-id=${data.id}`}
      className="w-fit flex p-1 mb-4 items-center bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      {({ loading }) =>
        loading ? (
          <span className="hidden md:block mx-2 py-1">Generando PDF...</span>
        ) : (
          <>
            <span className="hidden md:block mx-2 py-1">Descargar</span>
            <Download className="mx-2 text-white" />
          </>
        )
      }
    </PDFDownloadLink>
  );
};

export { PermissionDownloadPdfButton };
