import { createStore } from 'vuex'
import { oauthModule } from './modules/oauth-module'

export const store = createStore({
  modules: {
    oauthModule,
  },
})
