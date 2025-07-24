import type { Commit } from 'vuex'
import type { OauthState } from '../types/oauth'

export const oauthModule = {
  state: () => ({
    accessToken: null,
  }),
  mutations: {
    setAccessToken(state: OauthState, accessToken: string) {
      state.accessToken = accessToken
    },
  },
  actions: {
    login({ commit }: { commit: Commit }, accessToken: string) {
      commit('setAccessToken', accessToken)
    },
  },
  getters: {
    getAccessToken(state: OauthState) {
      return state.accessToken
    },
  },
}
