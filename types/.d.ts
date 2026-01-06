declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.svg' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}

declare module '*.svg?raw' {
  const src: string;
  export default src;
}

// Git构建信息全局变量类型声明
declare const __GIT_VERSION__: string;
declare const __GIT_BRANCH__: string;
declare const __BUILD_TIME__: string;