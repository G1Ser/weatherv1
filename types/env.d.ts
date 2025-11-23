/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly VUE_APP_LOCAL_LOCATION: string;
    readonly VUE_APP_AMAP_API: string;
  }
}
