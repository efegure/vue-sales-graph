/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_CLIENT_SECRET: string
  readonly VITE_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
  export * from 'vuex/types/helpers.d.ts'
  export * from 'vuex/types/logger.d.ts'
  export * from 'vuex/types/vue.d.ts'
}
