import { useParams } from "react-router";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { PermissionDownloadPdfButton } from "@/components/PermissionDownloadPdfButton";
import type { PermissionDownloadResponse } from "@/types/workAtHeights";
import { Loading } from "@/components/Loading";
import ErrorModal from "@/components/ErrorModal";
import { URL_API } from "../../config/api";

type ResponseType = "SI" | "NO" | "NA";

const CompletedPermit = () => {
  let { permissionId } = useParams();
  const [activeTab, setActiveTab] = useState("general");

  const {
    data: completedPermissionToDownload,
    loading: loadingCompletedPermissionToDownload,
    error: errorCompletedPermissionToDownload,
  } = useFetch<PermissionDownloadResponse>(
    `${URL_API}/work-at-heights/pending-complete-permissions/${permissionId}`
  );

  if (loadingCompletedPermissionToDownload) return <Loading />;

  if (errorCompletedPermissionToDownload) {
    return (
      <ErrorModal
        isOpen={true}
        onClose={() => {
          window.location.reload();
        }}
        message={
          "Ocurrió un error al cargar los permisos. Por favor, inténtalo de nuevo."
        }
      />
    );
  }

  const completedPermissionToDownloadData =
    completedPermissionToDownload?.data || [];
  const documentsSupportWithAnswers =
    completedPermissionToDownloadData[0].documentsSupport;
  const itemsCheckWithAnswers =
    completedPermissionToDownloadData[0].answersCheckPermission;
  const signaturesExecutorsPermission =
    completedPermissionToDownloadData[0].signaturesPermission.filter(
      (signature) => signature.role === "ejecutor"
    );
  const signaturesCoordinatorPermission =
    completedPermissionToDownloadData[0].signaturesPermission.filter(
      (signature) => signature.role === "coordinador"
    );
  const signaturesAuthorizerPermission =
    completedPermissionToDownloadData[0].signaturesPermission.filter(
      (signature) => signature.role === "autorizador"
    );

  const tabs = [
    { id: "general", label: "General", icon: "📋" },
    { id: "documentos", label: "Documentos", icon: "📄" },
    { id: "equipos", label: "Equipos", icon: "🦺" },
    { id: "proteccion", label: "Protección", icon: "🛡️" },
    { id: "acceso", label: "Acceso", icon: "🪜" },
    { id: "chequeo", label: "Chequeo", icon: "✅" },
    { id: "firmas", label: "Firmas", icon: "✍️" },
  ];

  const ResponseBadge = ({ response }: { response: ResponseType }) => {
    const styles: Record<ResponseType, string> = {
      SI: "bg-green-100 text-green-800 border-green-200",
      NO: "bg-red-100 text-red-800 border-red-200",
      NA: "bg-gray-100 text-gray-800 border-gray-200",
    } as const;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${
          styles[response] || styles["NA"]
        }`}
      >
        {response} {response !== "NA" && (response === "SI" ? "✓" : "✗")}
      </span>
    );
  };

  const EquipmentCard = ({
    items,
    title,
  }: {
    items: string[];
    title: string;
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <h3 className="font-semibold text-gray-900 mb-3 text-sm">{title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <span className="text-sm text-gray-700">{item}</span>
            <span className="text-green-600 font-bold">✓</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Función helper para validar y convertir respuestas
  const normalizeResponse = (response: string): ResponseType => {
    const validResponses: ResponseType[] = ["SI", "NO", "NA"];
    return validResponses.includes(response as ResponseType)
      ? (response as ResponseType)
      : "NA";
  };

  const renderMobileContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Información General
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Contratista
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {completedPermissionToDownloadData[0].customer}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Fecha
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {new Date(
                      completedPermissionToDownloadData[0].permissionStartDate
                    ).toLocaleDateString("es-CO")}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Descripción del Trabajo
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {completedPermissionToDownloadData[0].description}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Consecutivo
                  </label>
                  <p className="text-sm text-gray-900 mt-1 font-bold">
                    {completedPermissionToDownloadData[0].sequence}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Tareas Críticas Simultáneas
              </h3>
              <div className="space-y-2">
                {[
                  "Trabajo en caliente",
                  "Izaje de cargas",
                  "Uso de productos químicos",
                ].map((task, index) => {
                  const isSelected =
                    completedPermissionToDownloadData[0].criticalTasks?.includes(
                      task
                    );
                  return (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        isSelected
                          ? "bg-blue-50 border border-blue-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{task}</span>
                        {isSelected && (
                          <span className="text-blue-600 font-bold">✓</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Límites Autorizados
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600 mb-1">Altura Máxima</p>
                  <p className="text-lg font-bold text-blue-600">
                    {parseInt(
                      completedPermissionToDownloadData[0].maxHeightAuthorized
                    )}
                    m
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <p className="text-xs text-gray-600 mb-1">Carga Máxima</p>
                  <p className="text-lg font-bold text-green-600">
                    {parseInt(
                      completedPermissionToDownloadData[0].maxLoadAuthorized
                    )}
                    Kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "documentos":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">
              Documentos de Soporte
            </h3>
            {documentsSupportWithAnswers.map((doc, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <h4 className="font-medium text-gray-900 mb-2 text-sm">
                  {doc.name}
                </h4>
                <div className="flex gap-2">
                  <ResponseBadge response={normalizeResponse(doc.response)} />
                </div>
              </div>
            ))}
          </div>
        );

      case "equipos":
        return (
          <div className="space-y-4">
            <EquipmentCard
              items={completedPermissionToDownloadData[0].fallElements}
              title="Equipo de Protección Contra Caídas"
            />
          </div>
        );

      case "proteccion":
        return (
          <div className="space-y-4">
            <EquipmentCard
              items={
                completedPermissionToDownloadData[0].personalProtectionElements
              }
              title="Elementos de Protección Personal"
            />
          </div>
        );

      case "acceso":
        return (
          <div className="space-y-4">
            <EquipmentCard
              items={completedPermissionToDownloadData[0].accessElements}
              title="Sistemas de Acceso y Elementos de Seguridad"
            />
          </div>
        );

      case "chequeo":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">
              Lista de Chequeo
            </h3>
            {itemsCheckWithAnswers.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Verificación
                  </p>
                  <p className="text-sm text-gray-900">{item.verification}</p>
                </div>
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Aspecto
                  </p>
                  <p className="text-sm text-gray-900">{item.aspect}</p>
                </div>
                <ResponseBadge response={normalizeResponse(item.response)} />
              </div>
            ))}
          </div>
        );

      case "firmas":
        return (
          <div className="space-y-4">
            <h1 className="text-xl text-center font-bold mb-4 px-4 md:px-0">
              Firmas para aprobación de inicio de labores
            </h1>
            {/* Ejecutores */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Ejecutores</h3>
              {signaturesExecutorsPermission.map((executor, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-b-0 pb-3 mb-3 last:mb-0"
                >
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div>
                      <p className="text-xs text-gray-500">Nombre</p>
                      <p className="text-sm font-medium">{executor.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">C.C.</p>
                      <p className="text-sm">{executor.identification}</p>
                    </div>
                  </div>
                  <div className="w-full h-20 border border-gray-200 rounded overflow-hidden">
                    <img
                      src={executor.signature}
                      alt={`Firma ${executor.name}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Autorizador */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Autorizador</h3>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <p className="text-xs text-gray-500">Nombre</p>
                  <p className="text-sm font-medium">
                    {signaturesAuthorizerPermission[0].name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">C.C.</p>
                  <p className="text-sm">
                    {signaturesAuthorizerPermission[0].identification}
                  </p>
                </div>
              </div>
              <div className="w-full h-20 border border-gray-200 rounded overflow-hidden">
                <img
                  src={signaturesAuthorizerPermission[0].signature}
                  alt="Firma Autorizador"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Coordinador */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Coordinador de Alturas
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <p className="text-xs text-gray-500">Nombre</p>
                  <p className="text-sm font-medium">
                    {signaturesCoordinatorPermission[0].name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">C.C.</p>
                  <p className="text-sm">
                    {signaturesCoordinatorPermission[0].identification}
                  </p>
                </div>
              </div>
              <div className="w-full h-20 border border-gray-200 rounded overflow-hidden">
                <img
                  src={signaturesCoordinatorPermission[0].signature}
                  alt="Firma Coordinador"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-xl text-center font-bold mb-4 px-4 md:px-0">
              Firmas cierre de permiso
            </h1>
            {/* Autorizador */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Autorizador</h3>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <p className="text-xs text-gray-500">Nombre</p>
                  <p className="text-sm font-medium">
                    {signaturesAuthorizerPermission[0].name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">C.C.</p>
                  <p className="text-sm">
                    {signaturesAuthorizerPermission[0].identification}
                  </p>
                </div>
              </div>
              <div className="w-full h-20 border border-gray-200 rounded overflow-hidden">
                <img
                  src={signaturesAuthorizerPermission[0].signature}
                  alt="Firma Autorizador"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Coordinador */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Coordinador de Alturas
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <p className="text-xs text-gray-500">Nombre</p>
                  <p className="text-sm font-medium">
                    {signaturesCoordinatorPermission[0].name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">C.C.</p>
                  <p className="text-sm">
                    {signaturesCoordinatorPermission[0].identification}
                  </p>
                </div>
              </div>
              <div className="w-full h-20 border border-gray-200 rounded overflow-hidden">
                <img
                  src={signaturesCoordinatorPermission[0].signature}
                  alt="Firma Coordinador"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4 px-4 md:px-0">
        Revise el permiso antes de descargarlo!
      </h1>

      <PermissionDownloadPdfButton
        type={"complete"}
        data={completedPermissionToDownloadData[0]}
      />

      {/* Vista Mobile */}
      <div className="md:hidden">
        {/* Header con logo - Mobile */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-4">
          <p className="mb-1 text-xs">
            <span className="font-bold text-xs">Versión:</span> 01
          </p>
          <div>
            <p className="text-xs text-gray-600 font-bold">SG-SST</p>
          </div>
          <p className="font-bold text-center text-sm mt-1 mb-3">
            PERMISO DE TRABAJO EN ALTURAS
          </p>
          <div className="text-center flex justify-center items-center mx-2">
            <img src={"/shield.svg"} alt="Logo empresa" className="w-8 h-8" />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-3 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-base mb-1">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 bg-gray-50 min-h-screen">
          {renderMobileContent()}
        </div>
      </div>
      {/* Vista Desktop - Original */}
      <div className="hidden md:block w-[280mm] min-h-[297mm] bg-white py-[20mm] px-[5mm] shadow-md rounded-md text-[#333] font-inter mx-auto">
        <header className="flex justify-between items-center mb-4 border border-black p-2 rounded">
          {/* Left: Company Logo */}
          <div className="w-1/4 flex justify-center">
            <img
              src={"/shield.svg"}
              alt="Logo de la Empresa"
              className="w-10 h-10"
            />
          </div>

          {/* Center: Company Name and Title */}
          <div className="text-center w-1/2">
            <div className="text-lg font-bold">NOMBRE EMPRESA</div>
            <div className="text-sm">SG-SST</div>
            <div className="text-lg font-bold mt-1">
              PERMISO DE TRABAJO EN ALTURAS
            </div>
          </div>

          {/* Right: Version, Date, Consecutivo */}
          <div className="text-xs text-right w-1/4">
            <div className="flex items-center justify-start ml-5 mb-2 h-5">
              <span className="font-bold mr-1">Versión:</span>
              <span>01</span>
            </div>
            <div className="flex items-center justify-start ml-5 mb-2 h-5">
              <span className="font-bold mr-1">Fecha:</span>
              <span>20 DE SEPTIEMBRE DE 2025</span>
            </div>
            <div className="flex items-end justify-start ml-5 h-5">
              <span className="font-bold mr-1">Consecutivo:</span>
              <div className="border-b border-black w-20 text-center text-base font-bold">
                {completedPermissionToDownloadData[0].sequence}
              </div>
            </div>
          </div>
        </header>
        {/* DATOS GENERALES DEL PERMISO */}
        <div className="border border-black p-2 mb-4">
          <div className="mb-2">
            <div className="flex items-center mb-2">
              <span className="font-bold w-1/4 text-sm">CONTRATISTA:</span>
              <div className="border-b border-black ml-2 flex-grow">
                {completedPermissionToDownloadData[0].customer}
              </div>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-bold w-1/4 text-sm">FECHA:</span>
              <div className="border-b border-black ml-2 flex-grow ">
                {new Date(
                  completedPermissionToDownloadData[0].permissionStartDate
                ).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-bold w-1/4 text-sm">
                DESCRIPCION DEL TRABAJO:
              </span>
              <div className="border-b border-black ml-2 flex-grow">
                {completedPermissionToDownloadData[0].description}
              </div>
            </div>
          </div>
        </div>
        {/* OTRAS TAREAS CRÍTICAS SIMULTÁNEAS (ajustado) */}
        <div className="font-bold text-center align-middle text-base border border-black p-1 bg-[--zetinox-blue-light]">
          OTRAS TAREAS CRÍTICAS SIMULTÁNEAS
        </div>
        <div className="grid grid-cols-3 gap-2 justify-items-center border-x border-b border-black p-2 mb-4">
          <div className="flex flex-row items-center gap-2">
            <label className="text-sm">TRABAJO EN CALIENTE</label>
            <div className="w-6 h-6 border border-black mr-auto ml-5 items-center flex justify-center text-[12px] font-bold">
              {completedPermissionToDownloadData[0].criticalTasks?.map(
                (critical) => {
                  return critical === "Trabajo en caliente" ? "X" : "";
                }
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label className="text-sm">IZAJE DE CARGAS</label>
            <div className="w-6 h-6 border border-black mr-auto ml-5 items-center flex justify-center text-[12px] font-bold">
              {completedPermissionToDownloadData[0]?.criticalTasks?.map(
                (critical) => {
                  return critical === "Izaje de cargas" ? "X" : "";
                }
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label className="text-sm">USO DE PRODUCTOS QUÍMICOS</label>
            <div className="w-6 h-6 border border-black mr-auto ml-5 items-center flex justify-center text-[12px] font-bold">
              {completedPermissionToDownloadData[0].criticalTasks?.map(
                (critical) => {
                  return critical === "Uso de productos químicos" ? "X" : "";
                }
              )}
            </div>
          </div>
        </div>

        {/* DOCUMENTOS DE SOPORTE REQUERIDOS (ajustado a tabla) */}
        <table className="w-full border-collapse text-xs mb-4">
          <thead>
            <tr>
              <th
                className="mb-2 font-bold text-center align-middle text-base border border-black p-1 bg-[--zetinox-blue-light]"
                colSpan={12}
              >
                DOCUMENTOS DE SOPORTE REQUERIDOS
              </th>
            </tr>
            <tr>
              <th className="w-80 border border-black p-1 text-center align-middle">
                REGISTRO
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                SI
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                NO
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                N/A
              </th>
              <th className="w-80 border border-black p-1 text-center align-middle">
                REGISTRO
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                SI
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                NO
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                N/A
              </th>
              <th className="w-80 border border-black p-1 text-center align-middle">
                REGISTRO
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                SI
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                NO
              </th>
              <th className="w-8 border border-black p-[0.1rem] text-center align-middle">
                N/A
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(
              { length: Math.ceil(documentsSupportWithAnswers.length / 3) },
              (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 3 }, (_, colIndex) => {
                    const itemIndex = rowIndex * 3 + colIndex;
                    const document = documentsSupportWithAnswers[itemIndex];

                    if (document) {
                      return [
                        <td
                          key={`${rowIndex}-${colIndex}-name`}
                          className="w-80 border border-black p-1 text-left align-middle"
                        >
                          {document.name}
                        </td>,
                        <td
                          key={`${rowIndex}-${colIndex}-si`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        >
                          {document.response === "SI" ? "X" : ""}
                        </td>,
                        <td
                          key={`${rowIndex}-${colIndex}-no`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        >
                          {document.response === "NO" ? "X" : ""}
                        </td>,
                        <td
                          key={`${rowIndex}-${colIndex}-na`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        >
                          {document.response === "NA" ? "X" : ""}
                        </td>,
                      ];
                    } else {
                      // Celdas vacías para completar la fila
                      return [
                        <td
                          key={`${rowIndex}-${colIndex}-name`}
                          className="w-80 border border-black p-1 text-left align-middle"
                        ></td>,
                        <td
                          key={`${rowIndex}-${colIndex}-si`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        ></td>,
                        <td
                          key={`${rowIndex}-${colIndex}-no`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        ></td>,
                        <td
                          key={`${rowIndex}-${colIndex}-na`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        ></td>,
                      ];
                    }
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
        {/* ALTURA Y CARGA MÁXIMA (en un solo renglón) */}
        <div className="flex items-center mb-4">
          <div className="flex items-center w-1/2 justify-center">
            <span className="font-bold w-fit">
              ALTURA MÁXIMA DE TRABAJO AUTORIZADA:
            </span>
            <div className="border-b border-black h-6 w-10 ml-3 text-center font-bold">
              {parseInt(
                completedPermissionToDownloadData[0].maxHeightAuthorized
              )}
            </div>
            <span className="ml-3">m</span>
          </div>
          <div className="flex items-center w-1/2 justify-center">
            <span className="font-bold w-fit">
              CARGA MÁXIMA DE TRABAJO AUTORIZADA:
            </span>
            <div className="border-b border-black h-6 w-10 ml-3 text-center font-bold">
              {parseInt(completedPermissionToDownloadData[0].maxLoadAuthorized)}
            </div>
            <span className="ml-3">Kg</span>
          </div>
        </div>
        {/* EQUIPO DE PROTECCIÓN CONTRA CAÍDAS */}
        <table className="w-full border-collapse text-xs mb-4">
          <thead>
            <tr>
              <th
                className="font-bold mb-2 text-center align-middle text-base border border-black p-1 bg-[--zetinox-blue-light]"
                colSpan={8}
              >
                EQUIPO DE PROTECCIÓN CONTRA CAÍDAS REQUERIDOS PARA LA TAREA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Puntos de anclaje
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Puntos de anclaje" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Mosquetones
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) => (fallElement === "Mosquetones" ? "X" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left ">
                Descendedor
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) => (fallElement === "Descendedor" ? "X" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Mecanismos de anclaje
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Mecanismos de anclaje" ? "X" : ""
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Eslinga para restricción
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Eslinga para restricción" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Ascendedor
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) => (fallElement === "Ascendedor" ? "X" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Líneas de vida horizontal cable
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Lineas de vida horizontal cable" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Eslinga para posicionamiento
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Eslinga para posicionamiento" ? "X" : ""
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Arrestador (freno)
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Arrestador (freno)" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Líneas de vida horizontal cuerda
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Lineas de vida horizontal cuerda"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Eslinga para detención
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Eslinga para detención" ? "X" : ""
                )}
              </td>
              <td className="h-6 border border-black p-1 text-left">Poleas</td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) => (fallElement === "Poleas" ? "X" : "")
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Líneas de vida vertical cable
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Lineas de vida vertical cable" ? "X" : ""
                )}
              </td>
              <td className="h-6 border border-black p-1 text-left">
                Arnés integral de seguridad
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Arnes integral de seguridad" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Líneas de vida vertical cuerda
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Lineas de vida vertical cuerda" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Cuerda certificada para rescate
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].fallElements.map(
                  (fallElement) =>
                    fallElement === "Cuerda certificada para rescate" ? "X" : ""
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {/* ELEMENTOS DE PROTECCIÓN PERSONAL NECESARIAS PARA LA ACTIVIDAD (nueva tabla) */}
        <table className="w-full border-collapse text-xs mb-4">
          <thead>
            <tr>
              <th
                className="font-bold mb-2 text-center align-middle text-base border border-black p-1 bg-[--zetinox-blue-light]"
                colSpan={8}
              >
                ELEMENTOS DE PROTECCIÓN PERSONAL NECESARIAS PARA LA ACTIVIDAD
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Casco con barbuquejo de 3 puntos
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement ===
                    "Casco con barbuquejo de 3 puntos"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Guantes dieléctricos
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Guantes dielectricos"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Protección respiratoria
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Proteccion respiratoria"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Botas de seguridad
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Botas de seguridad"
                      ? "X"
                      : ""
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Protección facial
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Protección facial" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Chaleco reflectivo
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Chaleco reflectivo"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left ">
                Gafas de seguridad
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Gafas de seguridad"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Ropa de trabajo (overol)
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Ropa de trabajo (overol)"
                      ? "X"
                      : ""
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Guantes de algodón
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Guantes de algodon"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Protección auditiva
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Proteccion auditiva"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Pantalla facial
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Pantalla facial" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Guantes de cuero
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Guantes de cuero" ? "X" : ""
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Careta de soldador
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Careta de soldador"
                      ? "X"
                      : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Impermeable
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "Impermeable" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left"></td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "" ? "" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left"></td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].personalProtectionElements.map(
                  (personalProtectionElement) =>
                    personalProtectionElement === "" ? "" : ""
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {/* SISTEMAS DE ACCESO, EQUIPOS Y ELEMENTOS DE SEGURIDAD REQUERIDOS PARA LA TAREA (nueva tabla) */}
        <table className="w-full border-collapse text-xs mb-6">
          <thead>
            <tr>
              <th
                className="font-bold mb-2 text-center align-middle text-base border border-black p-1 bg-[--zetinox-blue-light]"
                colSpan={8}
              >
                SISTEMAS DE ACCESO, EQUIPOS Y ELEMENTOS DE SEGURIDAD REQUERIDOS
                PARA LA TAREA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Extintores
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) => (fallElement === "Extintores" ? "X" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Kit ambiental
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) => (fallElement === "Kit ambiental" ? "X" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Escaleras tipo tijera
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) =>
                    fallElement === "Escaleras tipo tijera" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Elementos para delimitación
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) =>
                    fallElement === "Elementos para delimitación" ? "X" : ""
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Kit Lava ojos
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) => (fallElement === "Kit Lava ojos" ? "X" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Escaleras extensibles
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) =>
                    fallElement === "Escalera extensibles" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Elementos de señalización
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) =>
                    fallElement === "Elementos de señalizacion" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Detector de gases
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) =>
                    fallElement === "Detector de gases" ? "X" : ""
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Escaleras fijas
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) =>
                    fallElement === "Escaleras fijas" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Equipos de Comunicación
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) =>
                    fallElement === "Equipos de Comunicación" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Andamios
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) => (fallElement === "Andamios" ? "X" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Elevadores
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) => (fallElement === "Elevadores" ? "X" : "")
                )}
              </td>
            </tr>
            <tr>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Botiquín
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) => (fallElement === "Botiquín" ? "X" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left">
                Grúas con canasta
              </td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) =>
                    fallElement === "Gruas con canasta" ? "X" : ""
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left"></td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) => (fallElement === "" ? "" : "")
                )}
              </td>
              <td className="w-60 h-6 border border-black p-1 text-left"></td>
              <td className="w-8 h-6 border border-black p-1 text-center font-bold">
                {completedPermissionToDownloadData[0].accessElements.map(
                  (fallElement) => (fallElement === "" ? "" : "")
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {/* LISTA DE CHEQUEO PARA PERMISO DE TRABAJO EN ALTURAS */}
        <table className="w-full border-collapse text-xs mb-5">
          <thead>
            <tr>
              <th
                className="font-bold mb-6 text-center align-middle text-base border border-black p-1 bg-[--zetinox-blue-light]"
                colSpan={7}
              >
                LISTA DE CHEQUEO PARA PERMISO DE TRABAJO EN ALTURAS
              </th>
            </tr>
            <tr>
              <th className="h-6 border border-black p-1 text-center">
                VERIFICACION IMPLEMENTACION
              </th>
              <th className="h-6 border border-black p-1 text-center">
                ASPECTO A TENER EN CUENTA
              </th>
              <th className="w-8 h-6 border border-black p-1 text-center">
                SI
              </th>
              <th className="w-8 h-6 border border-black p-1 text-center">
                NO
              </th>
              <th className="w-8 h-6 border border-black p-1 text-center">
                N/A
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(
              { length: Math.ceil(documentsSupportWithAnswers.length / 1) },
              (_, rowIndex) => (
                <tr key={`${rowIndex}`}>
                  {Array.from({ length: 1 }, (_, colIndex) => {
                    const indexElement = rowIndex * 1 + colIndex;
                    const answer = itemsCheckWithAnswers[indexElement];
                    if (answer) {
                      return [
                        <td
                          key={`${rowIndex}-${colIndex}-verification`}
                          className="h-6 border border-black p-1 text-left"
                        >
                          {answer.verification}
                        </td>,
                        <td
                          key={`${rowIndex}-${colIndex}-aspect`}
                          className="h-6 border border-black p-1 text-left"
                        >
                          {answer.aspect}
                        </td>,
                        <td
                          key={`${rowIndex}-${colIndex}-yes`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        >
                          {answer.response === "SI" ? "X" : ""}
                        </td>,
                        <td
                          key={`${rowIndex}-${colIndex}-no`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        >
                          {answer.response === "NO" ? "X" : ""}
                        </td>,
                        <td
                          key={`${rowIndex}-${colIndex}-na`}
                          className="w-8 h-6 border border-black p-1 text-center font-bold"
                        >
                          {answer.response === "NA" ? "X" : ""}
                        </td>,
                      ];
                    }
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
        {/* DATOS DEL EJECUTOR Y/O EJECUTORES */}

        <div className="font-bold text-center align-middle text-base border border-black p-1 bg-[--zetinox-blue-light]">
          DATOS DEL EJECUTOR Y/O EJECUTORES
        </div>
        <p className="text-xs pb-2 px-1 pt-6 border-x border-black">
          He entendido claramente el alcance y riesgos del trabajo y lo
          realizaré con todas las medidas de seguridad para realizar un trabajo
          seguro en altura. Manifiesto que estoy en óptimas condiciones de salud
          para desempeñar el trabajo en alturas.
        </p>
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr>
              <th className="h-6 border border-black p-1 text-center">
                NOMBRE
              </th>
              <th className="h-6 border border-black p-1 text-center">
                C.C. N°
              </th>
              <th className="h-6 border border-black p-1 text-center">FIRMA</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(
              { length: signaturesExecutorsPermission.length },
              (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 3 }, (_, colIndex) => {
                    const index = colIndex * 3 + rowIndex;
                    const signature = signaturesExecutorsPermission[index];
                    if (signature) {
                      return [
                        <td
                          key={`${colIndex}-name`}
                          className="border border-black p-1 text-center"
                        >
                          {signature.name}
                        </td>,
                        <td
                          key={`${colIndex}-id`}
                          className="border border-black p-1 text-center"
                        >
                          {signature.identification}
                        </td>,
                        <td
                          key={`${colIndex}-signature`}
                          className="w-[300px] h-[150px] border border-black p-1 text-center"
                        >
                          <img
                            src={signature.signature}
                            alt={`Firma ejecutor ${signature.name}`}
                            className="object-cover h-full w-full"
                          />
                        </td>,
                      ];
                    }
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* APROBACIÓN Y REFRENDACIÓN DEL PERMISO - sin título principal */}
        <div className="border border-black p-2 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold mb-2">DATOS DEL AUTORIZANTE</div>
              <p className="text-xs mb-3 min-h-16">
                He verificado las condiciones de seguridad y doy aprobación para
                ejecutar el trabajo seguro en alturas
              </p>
              <div className="flex items-center mb-2 mr-24">
                <span className="font-bold w-1/4">NOMBRE:</span>
                <div className="border-b border-black ml-2 flex-grow text-center">
                  {signaturesAuthorizerPermission[0].name}
                </div>
              </div>
              <div className="flex items-center mb-2 mr-24">
                <span className="font-bold w-1/4">C.C. N°:</span>
                <div className="border-b border-black ml-2 flex-grow text-center">
                  {signaturesAuthorizerPermission[0].identification}
                </div>
              </div>
              <div className="flex items-center mb-2 mr-24">
                <span className="font-bold w-1/4">FIRMA:</span>
                <div className="border-b ml-2 flex-grow w-[300px] h-[150px] border-black p-1 text-center">
                  <img
                    src={signaturesAuthorizerPermission[0].signature}
                    alt="Logo de la Empresa"
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-2">
                DATOS DEL COORDINADOR DE ALTURAS
              </div>
              <p className="text-xs mb-3 min-h-16">
                He verificado las listas de chequeo que avalan este permiso y el
                alcance de los riesgos del trabajo en alturas y supervisaré que
                todas las medidas de seguridad sean implementadas para realizar
                un trabajo seguro en altura
              </p>
              <div className="flex items-center mb-2 mr-24">
                <span className="font-bold w-1/4">NOMBRE:</span>
                <div className="border-b border-black ml-2 flex-grow text-center">
                  {signaturesCoordinatorPermission[0].name}
                </div>
              </div>
              <div className="flex items-center mb-2 mr-24">
                <span className="font-bold w-1/4">C.C. N°:</span>
                <div className="border-b border-black ml-2 flex-grow text-center">
                  {signaturesCoordinatorPermission[0].identification}
                </div>
              </div>
              <div className="flex items-center mb-2 mr-24">
                <span className="font-bold w-1/4">FIRMA:</span>
                <div className="border-b ml-2 flex-grow w-[300px] h-[150px] border-black p-1 text-center">
                  <img
                    src={signaturesCoordinatorPermission[0].signature}
                    alt="Logo de la Empresa"
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FINALIZACIÓN Y CIERRE DEL PERMISO TRABAJO EN ALTURAS (nueva sección) */}
        <div className="border border-black p-2 mb-4">
          <div className="font-bold mb-2 text-center">
            FINALIZACIÓN Y CIERRE DEL PERMISO TRABAJO EN ALTURAS
          </div>
          <p className="text-xs mb-2">
            Recibo el frente de trabajo y equipos en condiciones adecuadas de
            orden, aseo y seguridad.
          </p>
          <div className="flex w-full mb-2 pt-5">
            <div className="flex items-center w-1/2">
              <div className="flex flex-col items-center mb-2 mr-5 w-full pr-24">
                <div className="flex items-center mb-2 w-full">
                  <span className="font-bold w-[40%]">
                    Firma del Autorizante:
                  </span>
                  <div className="border-b border-black ml-2 flex-grow w-1/2 signature">
                    <img
                      src={signaturesAuthorizerPermission[0].signature}
                      alt="Logo de la Empresa"
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center mb-2 w-full">
                  <span className="font-bold w-[40%]">CC Nº:</span>
                  <div className="border-b border-black ml-2 flex-grow w-1/2 text-center">
                    {signaturesAuthorizerPermission[0].identification}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-1/2 ml-4">
              <div className="flex flex-col items-center mb-2 w-full pr-24">
                <div className="flex items-center mb-2 w-full">
                  <span className="font-bold w-[40%]">
                    Firma del Coordinador:
                  </span>
                  <div className="border-b border-black ml-2 flex-grow w-1/2 signature">
                    <img
                      src={signaturesCoordinatorPermission[0].signature}
                      alt="Logo de la Empresa"
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center mb-2 w-full">
                  <span className="font-bold w-[40%]">CC Nº:</span>
                  <div className="border-b border-black ml-2 flex-grow w-1/2 text-center">
                    {signaturesCoordinatorPermission[0].identification}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CompletedPermit };
