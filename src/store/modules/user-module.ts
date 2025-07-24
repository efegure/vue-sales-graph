import type { Commit } from 'vuex'
import type { UserState } from '../types/user'
import type { UserLoginInformationResponse } from '@/types/api/user'
import { userService } from '@/services/user-service'
import type { RootGetters } from '../types'

export const userModule = {
  state: () => ({
    userLoginInformation: null,
  }),
  mutations: {
    setUserLoginInformation(state: UserState, userLoginInformation: UserLoginInformationResponse) {
      state.userLoginInformation = userLoginInformation.Data
    },
  },
  actions: {
    async fetchUserLoginInformation({
      commit,
      rootGetters,
    }: {
      commit: Commit
      rootGetters: RootGetters
    }) {
      const token = rootGetters['getAccessToken']
      const email = rootGetters['getEmail']
      if (!token || !email) {
        return
      }
      const response = await userService.getUserInformation({ email }, token)
      if (response.ApiStatusCode === 200) {
        commit('setUserLoginInformation', response)
      }
      return response
    },
    logout({ commit }: { commit: Commit }) {
      commit('setUserLoginInformation', null)
    },
  },
  getters: {
    getUserLoginInformation(state: UserState) {
      return state.userLoginInformation
    },
  },
}
