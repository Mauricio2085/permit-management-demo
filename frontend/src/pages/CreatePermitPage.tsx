import { CreatePermitForm } from "@/components/CreatePermitForm";

const CreatePermitPage = () => {
  return (
    <div className="md:p-6 flex flex-col bg-gray-100">
      <section className="w-full h-40 bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg mb-6 flex items-center justify-center">
        <h1 className="text-white text-center text-2xl md:text-3xl font-bold">
          CREANDO PERMISO DE TRABAJOS EN ALTURAS
        </h1>
      </section>
      <CreatePermitForm />
    </div>
  );
};

export { CreatePermitPage };
