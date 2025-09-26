/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_NODE_ENV: string;
  // Agrega más variables de entorno aquí si las necesitas
  // readonly VITE_OTRA_VARIABLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
