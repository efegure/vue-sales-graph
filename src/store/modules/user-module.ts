import type { Commit } from 'vuex'
import type { UserState } from '../types/user'
import type { UserLoginInformationRequest, UserLoginInformationResponse } from '@/types/api/user'

export const userModule = {
  state: () => ({
    userLoginInformation: null,
  }),
  mutations: {
    setUserLoginInformation(state: UserState, userLoginInformation: UserLoginInformationResponse) {
      state.userLoginInformation = userLoginInformation
    },
  },
  actions: {
    fetchUserLoginInformation(
      { commit }: { commit: Commit },
      userLoginInformation: UserLoginInformationRequest,
    ) {
      commit('setUserLoginInformation', userLoginInformation)
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
