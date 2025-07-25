import type { Commit, Dispatch } from 'vuex'
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
    resetState(state: UserState) {
      state.userLoginInformation = null
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
    async logout({
      commit,
      dispatch,
      rootGetters,
    }: {
      commit: Commit
      dispatch: Dispatch
      rootGetters: RootGetters
    }) {
      const token = rootGetters['getAccessToken']
      if (!token) {
        return
      }
      const response = await userService.logout(token)
      if (response.ApiStatusCode === 200) {
        commit('resetState')
        dispatch('resetOAuthData')
        dispatch('resetSalesData')
      }
    },
  },
  getters: {
    getUserLoginInformation(state: UserState) {
      return state.userLoginInformation
    },
  },
}
