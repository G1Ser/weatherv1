/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_LOCATION: string;
  readonly VITE_AMAP_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
