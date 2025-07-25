import type { Commit } from 'vuex'
import type { OauthState } from '../types/oauth'
import { oauthService } from '@/services/oauth-service'
import type { AccessTokenResponse } from '@/types/api/oauth'

export const oauthModule = {
  state: () => ({
    oauthData: null,
    email: '',
  }),
  mutations: {
    setOauthData(state: OauthState, data: AccessTokenResponse['Data']) {
      state.oauthData = data
    },
    setEmail(state: OauthState, email: string) {
      state.email = email
    },
  },
  actions: {
    async login(
      { commit }: { commit: Commit },
      { email, password }: { email: string; password: string },
    ) {
      const response = await oauthService.fetchAccessToken({
        Email: email,
        Password: password,
        GrantType: 'password',
        Scope: 'amazon_data',
        ClientId: 'C0001',
        ClientSecret: import.meta.env.VITE_CLIENT_SECRET,
        RedirectUri: import.meta.env.VITE_REDIRECT_URI,
      })
      if (response.ApiStatusCode === 200) {
        commit('setOauthData', response.Data)
        commit('setEmail', email)
      }
      return response
    },
    resetOAuthData({ commit }: { commit: Commit }) {
      commit('setOauthData', null)
      commit('setEmail', '')
    },
  },
  getters: {
    getAccessToken(state: OauthState) {
      return state.oauthData?.AccessToken
    },
    getTokenExpiration(state: OauthState) {
      return state.oauthData?.ExpiresAt
    },
    getEmail(state: OauthState) {
      return state.email
    },
  },
}
