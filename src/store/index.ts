import { createStore, Store, useStore } from 'vuex'
import { oauthModule } from './modules/oauth-module'
import { userModule } from './modules/user-module'
import { salesAnalyticsModule } from './modules/sales-analytics-module'
import type { RootState } from './types'
import type { InjectionKey } from 'vue'

export const store = createStore({
  modules: {
    oauthModule,
    userModule,
    salesAnalyticsModule,
  },
})

export function useTypedStore() {
  return useStore(key)
}

export const key: InjectionKey<Store<RootState>> = Symbol()
