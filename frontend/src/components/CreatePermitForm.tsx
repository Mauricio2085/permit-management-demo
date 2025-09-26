import { useForm, Controller, useFieldArray } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { useFetch } from "@/hooks/useFetch";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type {
  InputsForm,
  SequenceResponse,
  ProvidersResponse,
  CriticalTaskResponse,
  DocumentSupportResponse,
  ProtectionElementsResponse,
} from "@/types/workAtHeights";
import { Loading } from "@/components/Loading";
import ErrorModal from "@/components/ErrorModal";
import { useRef, useState } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import workHeightsSchema from "@/lib/workHeightsSchema";
import SuccessModal from "@/components/PermitSuccessModal";
import { useNavigate } from "react-router";
import { URL_API } from "../../config/api";

const schema = workHeightsSchema;

const CreatePermitForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputsForm>({
    resolver: yupResolver(schema),
    // Valores por defecto para asegurar que los campos existan y no sean 'undefined'
    defaultValues: {
      criticalTasks: [{ value: "" }],
      documentsSupport: [{ value: "" }],
      fallElements: [{ value: "" }],
      personalProtectionElements: [{ value: "" }],
      accessElements: [{ value: "" }],
      executors: [{ nombre: "", cedula: "", signature: null }],
      // Valores por defecto campos numéricos y de fecha
      maxHeightAuthorized: 0,
      maxLoadAuthorized: 0,
      permissionElaborationDate: "",
      permissionStartDate: "",
      permissionEndDate: "",
      // Valores por defecto checklist
      siteIsolated: "NA",
      barriersInstalled: "NA",
      instructionsReceived: "NA",
      knowledgeVerified: "NA",
      simultaneousWork: "NA",
      socialSecurityVerified: "NA",
      medicalCertificateVerified: "NA",
      // Firmas por defecto
      authorizerName: "",
      authorizerId: "",
      authorizerSignature: null,
      coordinatorName: "",
      coordinatorId: "",
      coordinatorSignature: null,
    },
  });

  // useFieldArray para manejo dinámico
  const {
    fields: fieldsCritical,
    append: appendCritical,
    remove: removeCritical,
  } = useFieldArray({
    control,
    name: "criticalTasks",
  });

  const {
    fields: fieldsDocumentsSupport,
    append: appendDocumentsSupport,
    remove: removeDocumentsSupport,
  } = useFieldArray({
    control,
    name: "documentsSupport",
  });

  const {
    fields: fieldsFallElements,
    append: appendFallElements,
    remove: removeFallElements,
  } = useFieldArray({
    control,
    name: "fallElements",
  });

  const {
    fields: fieldsPersonalProtectionElements,
    append: appendPersonalProtectionElements,
    remove: removePersonalProtectionElements,
  } = useFieldArray({
    control,
    name: "personalProtectionElements",
  });

  const {
    fields: fieldsAccessElements,
    append: appendAccessElements,
    remove: removeAccessElements,
  } = useFieldArray({
    control,
    name: "accessElements",
  });

  const {
    fields: fieldsExecutors,
    append: appendExecutors,
    remove: removeExecutors,
  } = useFieldArray({
    control,
    name: "executors",
  });

  const signatureCanvasRefs = useRef<Record<string, SignatureCanvas | null>>(
    {}
  );
  const authorizerSigCanvas = useRef<SignatureCanvas | null>(null);
  const coordinatorSigCanvas = useRef<SignatureCanvas | null>(null);

  const {
    data: consecutive,
    loading: loadingConsecutive,
    error: errorConsecutive,
  } = useFetch<SequenceResponse>(`${URL_API}/work-at-heights/sequence`);

  const {
    data: providers,
    loading: loadingProviders,
    error: errorProviders,
  } = useFetch<ProvidersResponse>(`${URL_API}/work-at-heights/providers`);

  const {
    data: critical,
    loading: loadingCritical,
    error: errorCritical,
  } = useFetch<CriticalTaskResponse>(
    `${URL_API}/work-at-heights/critical-tasks`
  );

  const {
    data: document,
    loading: loadingDocuments,
    error: errorDocuments,
  } = useFetch<DocumentSupportResponse>(
    `${URL_API}/work-at-heights/documents-support`
  );

  const {
    data: fallElements,
    loading: loadingFallElements,
    error: errorFallElements,
  } = useFetch<ProtectionElementsResponse>(
    `${URL_API}/work-at-heights/fall-protection-systems`
  );

  const {
    data: personalprotection,
    loading: loadingPersonalprotection,
    error: errorPersonalprotection,
  } = useFetch<ProtectionElementsResponse>(
    `${URL_API}/work-at-heights/personal-protection-elements`
  );

  const {
    data: access,
    loading: loadingAccess,
    error: errorAccess,
  } = useFetch<ProtectionElementsResponse>(
    `${URL_API}/work-at-heights/access-systems`
  );

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    console.log("Datos del formulario enviados:", data);
    try {
      const dataSent = await axios.post(
        `${URL_API}/work-at-heights/permission`,
        data
      );
      console.log("Datos enviados exitosamente: ", dataSent);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage(
        "Ocurrió un error al enviar los datos al formulario. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleSuccessModalClose = () => {
    setIsModalOpen(false);
    navigate(`/admin?t=${Date.now()}`, { replace: true });
  };

  if (
    loadingCritical ||
    loadingProviders ||
    loadingDocuments ||
    loadingFallElements ||
    loadingPersonalprotection ||
    loadingAccess ||
    loadingConsecutive
  )
    return <Loading />;

  if (
    errorConsecutive ||
    errorCritical ||
    errorProviders ||
    errorDocuments ||
    errorPersonalprotection ||
    errorFallElements ||
    errorAccess
  )
    return (
      <ErrorModal
        isOpen={true}
        onClose={() => {
          window.location.reload();
        }}
        message={
          "Ocurrió un error al cargar la información del formulario. Por favor, inténtalo de nuevo."
        }
      />
    );

  const providersLoaded = providers?.data || [];
  const criticalTasks = critical?.data || [];
  const documentsSupport = document?.data || [];
  const fallProtectionSystems = fallElements?.data || [];
  const personalProtectionElements = personalprotection?.data || [];
  const accessSystems = access?.data || [];
  const consecutiveLoaded = consecutive?.data;
  console.log(consecutive?.data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:max-w-4xl"
    >
      <span className="text-xs md:text-sm text-gray-500 mb-5">
        Por favor llene los campos del lugar donde va a realizarse el trabajo:
      </span>
      <label className="text-xs mb-2 font-bold" htmlFor="customer">
        Consecutivo
      </label>
      <Input
        type="text"
        id="consecutive"
        value={consecutiveLoaded}
        className="w-40 text-xs mb-5"
        disabled
      />
      <label className="text-xs mb-2 font-bold" htmlFor="customer">
        Contratista
      </label>
      <Controller
        name="customer"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="md:w-80 text-xs mb-2">
                <SelectValue placeholder="Elija contratista" />
              </SelectTrigger>
              <SelectContent>
                {providersLoaded?.map((provider) => (
                  <SelectItem
                    key={provider.id}
                    className="text-xs"
                    value={provider.name}
                  >
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-red-600 text-xs font-bold mb-2 ">
              {errors.customer?.message}
            </p>
          </>
        )}
      />
      <label className="text-xs mb-2 font-bold" htmlFor="description">
        Descripción
      </label>
      <Textarea
        {...register("description", { required: true })}
        className="md:w-80 text-xs mb-2"
        id="description"
        placeholder="Descripción del trabajo a realizar"
      />
      <p className="text-red-600 text-xs font-bold mb-2">
        {errors.description?.message}
      </p>
      <label className="text-xs mb-2 font-bold" htmlFor="criticalTasks">
        Tareas críticas simultáneas al permiso
      </label>
      {/* Renderizado dinámico de los Selects */}
      {fieldsCritical.map((field, index) => (
        <div key={field.id} className="flex flex-col items-start">
          <Controller
            name={`criticalTasks.${index}.value`}
            control={control}
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="md:w-80 text-xs mb-2">
                    <SelectValue placeholder="Elija tarea asociada" />
                  </SelectTrigger>
                  <SelectContent>
                    {criticalTasks.map((criticalTask) => (
                      <SelectItem
                        key={criticalTask.id}
                        className="text-xs"
                        value={criticalTask.name}
                      >
                        {criticalTask.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-red-600 text-xs font-bold mb-2">
                  {errors.criticalTasks &&
                    errors.criticalTasks[index]?.value?.message}
                </p>
              </>
            )}
          />
          {fieldsCritical.length > 1 && (
            // Mostrar botón de eliminar si hay más de uno
            <button
              type="button"
              onClick={() => removeCritical(index)}
              className="text-orange-700 text-xs font-bold mt-1 mb-4"
            >
              Eliminar tarea -
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="w-fit text-start text-xs text-sst-blue font-bold mb-8"
        onClick={() => appendCritical({ value: "" })} // Añadir nueva tarea crítica
      >
        Adicionar tarea +
      </button>
      <label className="text-xs mb-2 font-bold" htmlFor="maxHeightAuthorized">
        Altura máxima de trabajo autorizada
      </label>
      <div className="flex items-center gap-2 mb-2 text-xs">
        <Input
          {...register("maxHeightAuthorized", { valueAsNumber: true })}
          id="maxHeightAuthorized"
          type="number"
          className="md:w-80 text-xs"
          placeholder="Descripción del trabajo a realizar"
        />
        <span className="font-bold">m</span>
      </div>
      <p className="text-red-600 text-xs font-bold mb-2">
        {errors.maxHeightAuthorized?.message}
      </p>
      <label className="text-xs mb-2 font-bold" htmlFor="maxLoadAuthorized">
        Carga máxima de trabajo autorizada
      </label>
      <div className="flex items-center gap-2 mb-2 text-xs">
        <Input
          {...register("maxLoadAuthorized", { valueAsNumber: true })}
          id="maxLoadAuthorized"
          type="number"
          className="md:w-80 text-xs"
          placeholder="Descripción del trabajo a realizar"
        />
        <span className="font-bold">kg</span>
      </div>
      <p className="text-red-600 text-xs font-bold mb-2">
        {errors.maxLoadAuthorized?.message}
      </p>
      <label
        className="text-xs mb-2 font-bold"
        htmlFor="permissionElaborationDate"
      >
        Fecha de elaboración permiso
      </label>
      <Input
        type="datetime-local"
        {...register("permissionElaborationDate")}
        id="permissionElaborationDate"
        className="md:w-80 text-xs mb-5"
      />
      <p className="text-red-600 text-xs font-bold mb-2">
        {errors.permissionElaborationDate?.message}
      </p>
      <span className="w-full border-t-[1px] border-gray-400 mb-5"></span>
      <span className="text-xs md:text-sm text-gray-500 mb-5">
        A continuación seleccione los documentos de soporte requeridos para el
        trabajo a realizar:
      </span>
      <label className="text-xs mb-2 font-bold" htmlFor="documentsSupport">
        Documentos de soporte
      </label>
      {fieldsDocumentsSupport.map((field, index) => (
        <div key={field.id} className="flex flex-col items-start">
          <Controller
            name={`documentsSupport.${index}.value`}
            control={control}
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="md:w-80 text-xs mb-2">
                    <SelectValue placeholder="Elija tarea asociada" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentsSupport.map((documentSupport) => (
                      <SelectItem
                        key={documentSupport.id}
                        className="text-xs"
                        value={documentSupport.name}
                      >
                        {documentSupport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-red-600 text-xs font-bold mb-2">
                  {errors.documentsSupport &&
                    errors.documentsSupport[index]?.value?.message}
                </p>
              </>
            )}
          />

          {fieldsDocumentsSupport.length > 1 && (
            <button
              type="button"
              onClick={() => removeDocumentsSupport(index)}
              className="text-orange-700 text-xs font-bold mt-1 mb-4"
            >
              Eliminar tarea -
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="w-fit text-start text-xs mb-5 text-sst-blue font-bold"
        onClick={() => appendDocumentsSupport({ value: "" })} // Añadir nuevo documento
      >
        Adicionar documento +
      </button>
      <span className="w-full border-t-[1px] border-gray-400 mb-5"></span>
      <span className="text-xs md:text-sm text-gray-500 mb-5">
        Ahora seleccione cada uno de los EPP, EPC, sistemas o elementos de
        acceso y elementos de seguridad para el trabajo a realizar:
      </span>
      <label className="text-xs mb-2 font-bold" htmlFor="fallElements">
        Elementos de protección contra caída (EPC)
      </label>
      {fieldsFallElements.map((field, index) => (
        <div key={field.id} className="flex flex-col items-start">
          <Controller
            name={`fallElements.${index}.value`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="md:w-80 text-xs mb-2">
                    <SelectValue placeholder="Elija tarea asociada" />
                  </SelectTrigger>
                  <SelectContent>
                    {fallProtectionSystems?.map((fallProtectionSystem) => (
                      <SelectItem
                        key={fallProtectionSystem.id}
                        className="text-xs"
                        value={fallProtectionSystem.name}
                      >
                        {fallProtectionSystem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-red-600 text-xs font-bold mb-2">
                  {errors.fallElements &&
                    errors.fallElements[index]?.value?.message}
                </p>
              </>
            )}
          />
          {fieldsFallElements.length > 1 && (
            <button
              type="button"
              onClick={() => removeFallElements(index)}
              className="text-orange-700 text-xs font-bold mt-1 mb-4"
            >
              Eliminar tarea -
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="w-fit text-start text-xs mb-5 text-sst-blue font-bold"
        onClick={() => appendFallElements({ value: "" })}
      >
        Adicionar elemento +
      </button>
      <label
        className="text-xs mb-2 font-bold"
        htmlFor="personalProtectionElements"
      >
        Elementos de protección personal (EPP)
      </label>
      {fieldsPersonalProtectionElements.map((field, index) => (
        <div key={field.id} className="flex flex-col items-start">
          <Controller
            name={`personalProtectionElements.${index}.value`}
            control={control}
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="md:w-80 text-xs mb-2">
                    <SelectValue placeholder="Elija tarea asociada" />
                  </SelectTrigger>
                  <SelectContent>
                    {personalProtectionElements?.map(
                      (personalProtectionElement) => (
                        <SelectItem
                          key={personalProtectionElement.id}
                          className="text-xs"
                          value={personalProtectionElement.name}
                        >
                          {personalProtectionElement.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <p className="text-red-600 text-xs font-bold mb-2">
                  {errors.personalProtectionElements &&
                    errors.personalProtectionElements[index]?.value?.message}
                </p>
              </>
            )}
          />
          {fieldsPersonalProtectionElements.length > 1 && (
            <button
              type="button"
              onClick={() => removePersonalProtectionElements(index)}
              className="text-orange-700 text-xs font-bold mt-1 mb-4"
            >
              Eliminar tarea -
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="w-fit text-start text-xs mb-5 text-sst-blue font-bold"
        onClick={() => appendPersonalProtectionElements({ value: "" })}
      >
        Adicionar elemento +
      </button>
      <label className="text-xs mb-2 font-bold" htmlFor="accessElements">
        Sistemas o elementos de acceso / Elementos de seguridad
      </label>
      {fieldsAccessElements.map((field, index) => (
        <div key={field.id} className="flex flex-col items-start">
          <Controller
            name={`accessElements.${index}.value`}
            control={control}
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="md:w-80 text-xs mb-2">
                    <SelectValue placeholder="Elija tarea asociada" />
                  </SelectTrigger>
                  <SelectContent>
                    {accessSystems?.map((accessSystem) => (
                      <SelectItem
                        key={accessSystem.id}
                        className="text-xs"
                        value={accessSystem.name}
                      >
                        {accessSystem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-red-600 text-xs font-bold mb-2">
                  {errors.accessElements &&
                    errors.accessElements[index]?.value?.message}
                </p>
              </>
            )}
          />
          {fieldsAccessElements.length > 1 && (
            <button
              type="button"
              onClick={() => removeAccessElements(index)}
              className="text-orange-700 text-xs font-bold mt-1 mb-4"
            >
              Eliminar tarea -
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="w-fit text-start text-xs mb-5 text-sst-blue font-bold"
        onClick={() => appendAccessElements({ value: "" })}
      >
        Adicionar elemento +
      </button>
      <span className="w-full border-t-[1px] border-gray-400 mb-5"></span>
      <span className="text-xs md:text-sm text-gray-500 mb-5">
        Lista de chequeo para permiso de trabajos en alturas:
      </span>
      <section className="w-full text-xs mb-5">
        <ol className="list-decimal list-inside">
          <div className="flex items-center gap-4 mb-5">
            <li className="w-4/5">
              El sitio donde se ejecutará el trabajo está aislado completamente
            </li>
            <div className="flex items-center gap-2">
              <Controller
                name="siteIsolated"
                control={control}
                defaultValue="NA"
                render={({ field }) => (
                  <>
                    <div className="flex flex-col items-center">
                      <label htmlFor="siteIsolated-si">SI</label>
                      <Checkbox
                        id="siteIsolated-si"
                        checked={field.value === "SI"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "SI" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="siteIsolated-no">NO</label>
                      <Checkbox
                        id="siteIsolated-no"
                        checked={field.value === "NO"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NO" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="siteIsolated-na">N.A</label>
                      <Checkbox
                        id="siteIsolated-na"
                        checked={field.value === "NA"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NA" : undefined)
                        }
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.siteIsolated && errors.siteIsolated.message}
          </p>
          <div className="flex items-center gap-4 mb-5">
            <li className="w-4/5">
              Se han instalado mamparas, cerramiento rígido o cinta para aislar
              la zona y no permitir el paso de vehículos o personas
            </li>
            <div className="flex items-center gap-2">
              <Controller
                name="barriersInstalled"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="flex flex-col items-center">
                      <label htmlFor="barriersInstalled-si">SI</label>
                      <Checkbox
                        id="barriersInstalled-si"
                        checked={field.value === "SI"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "SI" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="barriersInstalled-no">NO</label>
                      <Checkbox
                        id="barriersInstalled-no"
                        checked={field.value === "NO"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NO" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="barriersInstalled-na">N.A</label>
                      <Checkbox
                        id="barriersInstalled-na"
                        checked={field.value === "NA"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NA" : undefined)
                        }
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.barriersInstalled && errors.barriersInstalled.message}
          </p>
          <div className="flex items-center gap-4 mb-5">
            <li className="w-4/5">
              La(s) persona(s) encargada(s) de ejecutar la labor ha(n) recibido
              instrucciones y precauciones a seguir en la ejecución de la tarea
            </li>
            <div className="flex items-center gap-2">
              <Controller
                name="instructionsReceived"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="flex flex-col items-center">
                      <label htmlFor="instructionsReceived-si">SI</label>
                      <Checkbox
                        id="instructionsReceived-si"
                        checked={field.value === "SI"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "SI" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="instructionsReceived-no">NO</label>
                      <Checkbox
                        id="instructionsReceived-no"
                        checked={field.value === "NO"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NO" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="instructionsReceived-na">N.A</label>
                      <Checkbox
                        id="instructionsReceived-na"
                        checked={field.value === "NA"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NA" : undefined)
                        }
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.instructionsReceived && errors.instructionsReceived.message}
          </p>
          <div className="flex items-center gap-4 mb-5">
            <li className="w-4/5">
              Se garantiza que las personas que realizarán el diligenciamiento
              del permiso y las que ejecutarán el trabajo conocen el equipo y
              los procedimientos contemplados para solicitar un permiso
            </li>
            <div className="flex items-center gap-2">
              <Controller
                name="knowledgeVerified"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="flex flex-col items-center">
                      <label htmlFor="knowledgeVerified-si">SI</label>
                      <Checkbox
                        id="knowledgeVerified-si"
                        checked={field.value === "SI"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "SI" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="knowledgeVerified-no">NO</label>
                      <Checkbox
                        id="knowledgeVerified-no"
                        checked={field.value === "NO"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NO" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="knowledgeVerified-na">N.A</label>
                      <Checkbox
                        id="knowledgeVerified-na"
                        checked={field.value === "NA"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NA" : undefined)
                        }
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.knowledgeVerified && errors.knowledgeVerified.message}
          </p>
          <div className="flex items-center gap-4 mb-5">
            <li className="w-4/5">
              Se realizaran trabajos simultáneos en la misma área
            </li>
            <div className="flex items-center gap-2">
              <Controller
                name="simultaneousWork"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="flex flex-col items-center">
                      <label htmlFor="simultaneousWork-si">SI</label>
                      <Checkbox
                        id="simultaneousWork-si"
                        checked={field.value === "SI"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "SI" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="simultaneousWork-no">NO</label>
                      <Checkbox
                        id="simultaneousWork-no"
                        checked={field.value === "NO"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NO" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="simultaneousWork-na">N.A</label>
                      <Checkbox
                        id="simultaneousWork-na"
                        checked={field.value === "NA"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NA" : undefined)
                        }
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.simultaneousWork && errors.simultaneousWork.message}
          </p>
          <div className="flex items-center gap-4 mb-5">
            <li className="w-4/5">
              Se ha verificado que los autorizados para realizar el trabajo
              estén al día en los pagos de seguridad social
            </li>
            <div className="flex items-center gap-2">
              <Controller
                name="socialSecurityVerified"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="flex flex-col items-center">
                      <label htmlFor="socialSecurityVerified-si">SI</label>
                      <Checkbox
                        id="socialSecurityVerified-si"
                        checked={field.value === "SI"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "SI" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="socialSecurityVerified-no">NO</label>
                      <Checkbox
                        id="socialSecurityVerified-no"
                        checked={field.value === "NO"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NO" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="socialSecurityVerified-na">N.A</label>
                      <Checkbox
                        id="socialSecurityVerified-na"
                        checked={field.value === "NA"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NA" : undefined)
                        }
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.socialSecurityVerified &&
              errors.socialSecurityVerified.message}
          </p>
          <div className="flex items-center gap-4 mb-5">
            <li className="w-4/5">
              Se ha verificado que los autorizados para realizar el trabajo
              cuenten con el certificado de aptitud medica para trabajos en
              altura
            </li>
            <div className="flex items-center gap-2">
              <Controller
                name="medicalCertificateVerified"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="flex flex-col items-center">
                      <label htmlFor="medicalCertificateVerified-si">SI</label>
                      <Checkbox
                        id="medicalCertificateVerified-si"
                        checked={field.value === "SI"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "SI" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="medicalCertificateVerified-no">NO</label>
                      <Checkbox
                        id="medicalCertificateVerified-no"
                        checked={field.value === "NO"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NO" : undefined)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label htmlFor="medicalCertificateVerified-na">N.A</label>
                      <Checkbox
                        id="medicalCertificateVerified-na"
                        checked={field.value === "NA"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "NA" : undefined)
                        }
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.medicalCertificateVerified &&
              errors.medicalCertificateVerified.message}
          </p>
        </ol>
      </section>
      <span className="w-full border-t-[1px] border-gray-400 mb-5"></span>
      <span className="text-xs md:text-sm text-gray-500 mb-5">
        Fechas de ejecución del permiso:
      </span>
      <label className="text-xs mb-2 font-bold" htmlFor="permissionStartDate">
        Fecha de inicio del permiso
      </label>
      <Input
        {...register("permissionStartDate")}
        type="datetime-local"
        id="permissionStartDate"
        className="md:w-80 text-xs mb-3"
      />
      <p className="text-red-600 text-xs font-bold mb-3">
        {errors.permissionStartDate?.message}
      </p>
      <label className="text-xs mb-2 font-bold" htmlFor="permissionEndDate">
        Fecha de finalización del permiso
      </label>
      <Input
        {...register("permissionEndDate")}
        type="datetime-local"
        id="permissionEndDate"
        className="md:w-80 text-xs mb-3"
      />
      <p className="text-red-600 text-xs font-bold mb-3">
        {errors.permissionEndDate?.message}
      </p>
      <span className="w-full border-t-[1px] border-gray-400 mb-5"></span>
      <span className="text-xs md:text-sm text-gray-500 mb-5">
        Firmas de ejecutores del permiso:
      </span>
      {fieldsExecutors.map((executor, indexExecutor) => (
        <div
          key={executor.id}
          className="flex flex-col md:flex-row items-start gap-2 mb-2 text-xs"
        >
          <div className="flex flex-col mb-2 text-xs w-2/3">
            <label
              className="text-xs mb-2 font-bold"
              htmlFor={`executors[${indexExecutor}].nombre`}
            >
              Nombre del ejecutor {indexExecutor + 1}
            </label>
            <Input
              id={`executors[${indexExecutor}].nombre`}
              {...register(`executors.${indexExecutor}.nombre`)}
              type="text"
              className="md:w-80 text-xs mb-3"
              placeholder="Escriba su nombre"
            />
            <p className="text-red-600 text-xs font-bold mb-2">
              {errors.executors?.[indexExecutor]?.nombre?.message}
            </p>
            <label
              className="text-xs mb-2 font-bold"
              htmlFor={`executors[${indexExecutor}].cedula`}
            >
              Cédula Ejecutor {indexExecutor + 1}
            </label>
            <Input
              {...register(`executors.${indexExecutor}.cedula`)}
              id={`executors[${indexExecutor}].cedula`}
              type="text"
              className="md:w-80 text-xs mb-5"
              placeholder="Cédula del ejecutor"
            />
            <p className="text-red-600 text-xs font-bold mb-2">
              {errors.executors?.[indexExecutor]?.cedula?.message}
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="text-xs mb-2 font-bold">
              Firma Ejecutor {indexExecutor + 1}
            </label>
            <SignatureCanvas
              ref={(ref) => {
                signatureCanvasRefs.current[`executorSig-${executor.id}`] = ref;
              }}
              penColor="black"
              canvasProps={{
                width: 300,
                height: 150,
                className: "sigCanvas",
                style: {
                  border: "1px solid #000",
                  marginBottom: "12px",
                },
              }}
              onEnd={() => {
                const sigData =
                  signatureCanvasRefs.current[
                    `executorSig-${executor.id}`
                  ]?.toDataURL();
                // setValue para actualizar el campo de la firma en react-hook-form
                setValue(
                  `executors.${indexExecutor}.signature`,
                  sigData || null,
                  {
                    shouldDirty: true, // Indica que el campo ha sido modificado
                    shouldValidate: true, // Valida el campo si tienes reglas de validación
                    shouldTouch: true, // Marca el campo como "tocado"
                  }
                );
              }}
            />
            <p className="text-red-600 text-xs font-bold mb-2">
              {errors.executors?.[indexExecutor]?.signature?.message}
            </p>
            <button
              type="button"
              onClick={() => {
                signatureCanvasRefs.current[
                  `executorSig-${executor.id}`
                ]?.clear();
                setValue(`executors.${indexExecutor}.signature`, null); // Limpiar también el valor en el formulario
              }}
              className="w-fit bg-gradient-to-r from-orange-600 to-orange-700 text-white border rounded-md p-2  hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Repetir firma
            </button>
            {fieldsExecutors.length > 1 && (
              <button
                type="button"
                onClick={() => removeExecutors(indexExecutor)}
                className="text-orange-700 text-xs text-start font-bold mt-2 mb-4"
              >
                Eliminar Ejecutor -
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendExecutors({ nombre: "", cedula: "", signature: null })
        }
        className="w-fit text-start text-xs mb-5 text-sst-blue font-bold"
      >
        Adicionar Ejecutor +
      </button>
      <span className="w-full border-t-[1px] border-gray-400 mb-5"></span>
      <span className="text-xs md:text-sm text-gray-500 mb-5">
        Datos del autorizante:
      </span>
      <div className="flex flex-col md:flex-row items-start gap-2 mb-2 text-xs">
        <div className="flex flex-col mb-2 text-xs w-2/3">
          <label className="text-xs mb-2 font-bold" htmlFor="authorizerName">
            Nombre autorizante
          </label>
          <Input
            id="authorizerName"
            {...register("authorizerName")}
            type="text"
            className="md:w-80 text-xs mb-3"
            placeholder="Escriba su nombre"
          />
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.authorizerName?.message}
          </p>
          <label className="text-xs mb-2 font-bold" htmlFor="authorizerId">
            Cédula autorizante
          </label>
          <Input
            {...register("authorizerId")}
            name="authorizerId"
            id="authorizerId"
            type="number"
            className="md:w-80 text-xs mb-3"
            placeholder="Ejemplo: 1234567890"
          />
          <p className="w-full text-red-600 text-xs font-bold mb-2">
            {errors.authorizerId?.message}
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <label
            className="text-xs mb-2 font-bold"
            htmlFor="authorizerSignature"
          >
            Firma Autorizador
          </label>
          <Controller
            name="authorizerSignature"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <>
                <SignatureCanvas
                  ref={authorizerSigCanvas}
                  penColor="black"
                  canvasProps={{
                    width: 300,
                    height: 150,
                    className: "sigCanvas",
                    style: {
                      border: "1px solid #000",
                      marginBottom: "12px",
                    },
                  }}
                  onEnd={() => {
                    const sigData = authorizerSigCanvas.current?.toDataURL();
                    setValue("authorizerSignature", sigData || null, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    });
                  }}
                />
                <p className="text-red-600 text-xs font-bold mb-2">
                  {errors.authorizerSignature?.message}
                </p>
                <button
                  type="button"
                  className="w-fit bg-gradient-to-r from-orange-600 to-orange-700 text-white border rounded-md p-2 mb-5 hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={() => {
                    authorizerSigCanvas.current?.clear();
                    field.onChange(null);
                  }}
                >
                  Repetir firma
                </button>
              </>
            )}
          />
        </div>
      </div>
      <span className="w-full border-t-[1px] border-gray-400 mb-5"></span>
      <span className="text-xs md:text-sm text-gray-500 mb-5">
        Datos del Coordinador de alturas:
      </span>
      <div className="flex flex-col md:flex-row items-start gap-2 mb-2 text-xs">
        <div className="flex flex-col mb-2 text-xs w-2/3">
          <label className="text-xs mb-2 font-bold" htmlFor="coordinatorName">
            Nombre Coordinador
          </label>
          <Input
            id="coordinatorName"
            {...register("coordinatorName")}
            type="text"
            className="md:w-80 text-xs mb-3"
            placeholder="Escriba su nombre"
          />
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.coordinatorName?.message}
          </p>
          <label className="text-xs mb-2 font-bold" htmlFor="coordinatorId">
            Cédula Coordinador
          </label>
          <Input
            id="coordinatorId"
            {...register("coordinatorId")}
            type="number"
            className="md:w-80 text-xs mb-3"
            placeholder="Ejemplo: 1234567890"
          />
          <p className="text-red-600 text-xs font-bold mb-2">
            {errors.coordinatorId?.message}
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <label
            className="text-xs mb-2 font-bold"
            htmlFor="coordinatorSignature"
          >
            Firma Coordinador
          </label>
          <Controller
            name="coordinatorSignature"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 300,
                    height: 150,
                    className: "sigCanvas",
                    style: {
                      border: "1px solid #000",
                      marginBottom: "12px",
                    },
                  }}
                  ref={coordinatorSigCanvas}
                  onEnd={() => {
                    const sigData = coordinatorSigCanvas.current?.toDataURL();
                    setValue("coordinatorSignature", sigData || null, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    });
                  }}
                />
                <p className="text-red-600 text-xs font-bold mb-2">
                  {errors.coordinatorSignature?.message}
                </p>
                <button
                  type="button"
                  className="w-fit bg-gradient-to-r from-orange-600 to-orange-700 text-white border rounded-md p-2 mb-5 hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={() => {
                    coordinatorSigCanvas.current?.clear();
                    field.onChange(null);
                  }}
                >
                  Repetir firma
                </button>
              </>
            )}
          />
        </div>
      </div>
      <span className="w-full border-t-[1px] border-gray-400 mb-5"></span>
      <button
        type="submit"
        className="w-fit self-center p-3 border my-10 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg  hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Crear Permiso
      </button>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleSuccessModalClose}
        type="created"
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={setIsErrorModalOpen}
        message={errorMessage}
      />
      ;
    </form>
  );
};

export { CreatePermitForm };
