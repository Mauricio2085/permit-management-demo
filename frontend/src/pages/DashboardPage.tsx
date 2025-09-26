import { useNavigate, Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle2,
  Search,
  Trash,
  FileText,
  Plus,
  Shield,
  LogOut,
} from "lucide-react";
import type { PermissionsResponse } from "@/types/workAtHeights";
import { Loading } from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import ErrorModal from "@/components/ErrorModal";
import { useAuth } from "@/contexts/AuthContext";
import SuccessModal from "@/components/PermitSuccessModal";
import { EliminatePermissionModal } from "@/components/EliminatePermissionModal";
import { ClosePermissionModal } from "@/components/ClosePermissionModal";
import { URL_API } from "../../config/api";

type SuccessTypes = "created" | "closed" | "deleted";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCloseCloseModalOpen, setIsCloseCloseModalOpen] =
    useState<boolean>(false);
  const [isCloseEliminateModalOpen, setIsCloseEliminateModalOpen] =
    useState<boolean>(false);
  const [currentPermissionSequence, setCurrentPermissionSequence] = useState<
    number | null
  >(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  useState<number | null>(null);
  const [typeSuccess, setTypeSuccess] = useState<SuccessTypes>("closed");
  const [reloadKey, setReloadKey] = useState(0);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const timestampParam = searchParams.get("t");
    if (timestampParam) {
      // Actualizar reloadKey para trigger useFetch
      setReloadKey((prev) => prev + 1);

      // Limpiar el timestamp de la URL para mantenerla limpia
      searchParams.delete("t");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const {
    data: pendingPermissions,
    loading: loadingPendingPermissions,
    error: errorPendingPermissions,
  } = useFetch<PermissionsResponse>(
    `${URL_API}/work-at-heights/pending-permissions-resume`,
    [reloadKey]
  );

  const {
    data: finishedPermissions,
    loading: loadingFinishedPermissions,
    error: errorFinishedPermissions,
  } = useFetch<PermissionsResponse>(
    `${URL_API}/work-at-heights/finished-permissions-resume`,
    [reloadKey]
  );

  if (loadingPendingPermissions) return <Loading />;
  if (loadingFinishedPermissions) return <Loading />;

  if (errorPendingPermissions || errorFinishedPermissions) {
    return (
      <ErrorModal
        isOpen={true}
        onClose={() => {
          window.location.reload();
        }}
        message={"An error occurred while loading permits. Please try again."}
      />
    );
  }

  const pendingPermissionsLoaded = pendingPermissions?.data || [];
  const finishedPermissionsLoaded = finishedPermissions?.data || [];

  const handleCreatePermission = () => {
    navigate("./permit");
  };

  const handleOpenCloseCloseModal = (sequence: number) => {
    setCurrentPermissionSequence(sequence);
    setIsCloseCloseModalOpen(true);
  };

  const handleOpenCloseEliminateModal = (sequence: number) => {
    setCurrentPermissionSequence(sequence);
    setIsCloseEliminateModalOpen(true);
  };

  const handleConfirmClose = async () => {
    console.log(`Cerrando permiso con ID: ${currentPermissionSequence}`);
    try {
      await axios.put(`${URL_API}/work-at-heights/permission`, {
        sequence: currentPermissionSequence,
      });
      setIsCloseCloseModalOpen(false);
      setCurrentPermissionSequence(null);
      setTypeSuccess("closed");
      setIsSuccessModalOpen(true);
      setReloadKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al cerrar el permiso", error);
      setErrorMessage(
        "Error al cerrar el permiso. Por favor, inténtalo de nuevo."
      );
      setIsErrorModalOpen(true);
    }
  };

  const handleConfirmEliminate = async () => {
    console.log(`Eliminando permiso con ID: ${currentPermissionSequence}`);
    try {
      await axios.delete(`${URL_API}/work-at-heights/permission`, {
        data: { sequence: currentPermissionSequence },
      });
      setIsCloseEliminateModalOpen(false);
      setCurrentPermissionSequence(null);
      setTypeSuccess("deleted");
      setIsSuccessModalOpen(true);
      setReloadKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al eliminar el permiso", error);
      setErrorMessage(
        "Error al eliminar el permiso. Por favor, inténtalo de nuevo."
      );
      setIsErrorModalOpen(true);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  // Filter permits based on search
  const filteredPendingPermissions = pendingPermissionsLoaded.filter(
    (permit) =>
      permit.sequence.toString().includes(search) ||
      permit.description.toLowerCase().includes(search.toLowerCase()) ||
      permit.customer.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFinishedPermissions = finishedPermissionsLoaded.filter(
    (permit) =>
      permit.id.toString().includes(search) ||
      permit.description.toLowerCase().includes(search.toLowerCase()) ||
      permit.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <section className="w-full bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg">
        <div className="container mx-auto px-2 md:px-6 py-12">
          <div className="flex items-start md:items-center justify-between">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
                TRABAJOS EN ALTURAS
              </h1>
              <p className="text-orange-100 text-base md:text-lg">
                Sistema de Gestión de Permisos de Trabajo
              </p>
            </div>

            <button
              onClick={() => {
                console.log("Cerrando sesión...");
                logout();
              }}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-sst-gray mb-3">
                  Panel de Control
                </h2>
                <p className="text-slate-600 mb-4 text-base md:text-lg">
                  Bienvenido al sistema de gestión de trabajos en alturas.
                  Administra tus permisos de forma segura y eficiente.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-sst-yellow/10 to-sst-yellow/5 border border-sst-yellow/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-sst-yellow/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-sst-yellow" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-sst-gray">
                          {pendingPermissionsLoaded.length}
                        </p>
                        <p className="text-sm text-slate-600">
                          Permisos Pendientes
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-sst-green/10 to-sst-green/5 border border-sst-green/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-sst-green/20 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-sst-green" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-sst-gray">
                          {finishedPermissionsLoaded.length}
                        </p>
                        <p className="text-sm text-slate-600">
                          Permisos Completados
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCreatePermission}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Crear Nuevo Permiso
                </button>
              </div>

              {/* Searching */}
              <div className="w-full lg:w-80">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-sst-gray mb-2"
                >
                  Buscar Permisos
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="search"
                    type="text"
                    placeholder="ID, descripción o contratista..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-slate-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm transition-colors"
                  />
                </div>
                {search && (
                  <p className="mt-2 text-sm text-slate-500">
                    Mostrando resultados para: "{search}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pending permits table */}
        <div className="mb-8">
          <div className="w-full md:w-fit justify-between flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-sst-yellow/20 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-sst-yellow" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-sst-gray">
              Permisos Pendientes
            </h2>
            <span className="bg-sst-yellow/20 text-sst-yellow px-3 py-1 rounded-full text-sm font-medium">
              {filteredPendingPermissions.length}
            </span>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-sst-gray uppercase tracking-wider">
                      Consecutivo
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-sst-gray uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-sst-gray uppercase tracking-wider">
                      Contratista
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-sst-gray uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredPendingPermissions.length > 0 ? (
                    filteredPendingPermissions.map((permit, index) => (
                      <tr
                        key={permit.id}
                        className={`hover:bg-slate-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-25"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sst-blue/10 text-sst-blue">
                            #{permit.sequence}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="text-sm font-medium text-sst-gray max-w-xs truncate"
                            title={permit.description}
                          >
                            {permit.description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">
                            {permit.customer}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-3">
                            <Link
                              to={`./descargar-permiso-pendiente/${permit.id}`}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-sst-blue hover:text-blue-700 hover:bg-sst-blue/10 rounded-lg transition-colors"
                              title="Descargar permiso"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              <span className="hidden sm:block">Descargar</span>
                            </Link>

                            <button
                              onClick={() => {
                                handleOpenCloseCloseModal(permit.sequence);
                              }}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-sst-green hover:text-green-700 hover:bg-sst-green/10 rounded-lg transition-colors"
                              title="Finalizar permiso"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              <span className="hidden sm:block">Finalizar</span>
                            </button>

                            <button
                              onClick={() =>
                                handleOpenCloseEliminateModal(permit.sequence)
                              }
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-sst-red hover:text-red-700 hover:bg-sst-red/10 rounded-lg transition-colors"
                              title="Eliminar permiso"
                            >
                              <Trash className="w-4 h-4 mr-1" />
                              <span className="hidden sm:block">Eliminar</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="text-slate-500">
                          {search
                            ? "No se encontraron permisos pendientes que coincidan con tu búsqueda."
                            : "No hay permisos pendientes en este momento."}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Completed permits table */}
        <div className="mb-12">
          <div className="w-full md:w-fit justify-between flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-sst-green/20 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-sst-green" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-sst-gray">
              Permisos Finalizados
            </h2>
            <span className="bg-sst-green/20 text-sst-green px-3 py-1 rounded-full text-sm font-medium">
              {filteredFinishedPermissions.length}
            </span>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-sst-gray uppercase tracking-wider">
                      Consecutivo
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-sst-gray uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-sst-gray uppercase tracking-wider">
                      Contratista
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-sst-gray uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredFinishedPermissions.length > 0 ? (
                    filteredFinishedPermissions.map((permit, index) => (
                      <tr
                        key={permit.id}
                        className={`hover:bg-slate-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-25"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sst-green/10 text-sst-green">
                            #{permit.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="text-sm font-medium text-sst-gray max-w-xs truncate"
                            title={permit.description}
                          >
                            {permit.description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">
                            {permit.customer}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <Link
                              to={`./descargar-permiso-completado/${permit.id}`}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-sst-blue hover:text-blue-700 hover:bg-sst-blue/10 rounded-lg transition-colors"
                              title="Descargar permiso completado"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              <span className="hidden sm:block">Descargar</span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="text-slate-500">
                          {search
                            ? "No se encontraron permisos finalizados que coincidan con tu búsqueda."
                            : "No hay permisos finalizados en este momento."}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de cierre de permisos */}
      <ClosePermissionModal
        isOpen={isCloseCloseModalOpen}
        onClose={setIsCloseCloseModalOpen}
        onConfirm={handleConfirmClose}
        permissionSequence={currentPermissionSequence || "N/A"}
      />
      {/* Modal de eliminación de permisos */}
      <EliminatePermissionModal
        isOpen={isCloseEliminateModalOpen}
        onClose={setIsCloseEliminateModalOpen}
        onConfirm={handleConfirmEliminate}
        permissionSequence={currentPermissionSequence || "N/A"}
      />
      {/* Modal de cierre o eliminación de permisos exitoso */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        type={typeSuccess}
      />
      {/* Modal de error */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={setIsErrorModalOpen}
        message={errorMessage}
      />
    </div>
  );
};

export { Dashboard };
