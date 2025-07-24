import { createStore, Store, useStore } from 'vuex'
import { oauthModule } from './modules/oauth-module'
import { userModule } from './modules/user-module'
import { salesAnalyticsModule } from './modules/sales-analytics-module'
import type { RootState } from './types'
import type { InjectionKey } from 'vue'
import VuexPersister from 'vuex-persister'

const vuexPersister = new VuexPersister<RootState>({
  storage: localStorage,
})

export const store = createStore({
  modules: {
    oauthModule,
    userModule,
    salesAnalyticsModule,
  },
  plugins: [vuexPersister.persist],
})

export function useTypedStore() {
  return useStore(key)
}

export const key: InjectionKey<Store<RootState>> = Symbol()
