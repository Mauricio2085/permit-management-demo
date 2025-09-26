/**
 * Función para obtener la URL base de la API
 * Prioriza variables de entorno, luego detecta automáticamente
 */
const getApiUrl = (): string => {
  // Acceso con type assertion temporal
  const env = (import.meta as any).env;

  // Prioridad 1: Variable de entorno VITE_API_URL
  if (env?.VITE_API_URL) {
    return env.VITE_API_URL;
  }

  // Prioridad 2: Auto-detección basada en el entorno de Vite
  if (env?.DEV) {
    return "http://localhost:5000/api/v1";
  }

  // Prioridad 3: URL de producción por defecto
  return "https://permit-management-demo.onrender.com/api/v1";
};

// Exportar la URL base
export const URL_API = getApiUrl();
