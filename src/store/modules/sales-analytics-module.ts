import type { Commit } from 'vuex'
import type {
  DailySalesOverviewRequest,
  DailySalesOverviewResponse,
} from '@/types/api/sales-analytics'
import type {
  DailySalesSKUListRequest,
  DailySalesSKUListResponse,
} from '@/types/api/sales-analytics'
import type { SKURefundRateRequest, SKURefundRateResponse } from '@/types/api/sales-analytics'
import type { SalesAnalyticsState } from '../types/sales'
import type { RootGetters } from '../types'
import { salesAnalyticsService } from '@/services/sales-analytics-service'

export const salesAnalyticsModule = {
  state: () => ({
    dailySalesOverview: null,
    dailySalesSKUList: null,
    skuRefundRate: null,
  }),
  mutations: {
    setDailySalesOverview(
      state: SalesAnalyticsState,
      dailySalesOverview: DailySalesOverviewResponse,
    ) {
      state.dailySalesOverview = dailySalesOverview.Data
    },
    setDailySalesSKUList(state: SalesAnalyticsState, dailySalesSKUList: DailySalesSKUListResponse) {
      state.dailySalesSKUList = dailySalesSKUList.Data
    },
    setSKURefundRate(state: SalesAnalyticsState, skuRefundRate: SKURefundRateResponse) {
      state.skuRefundRate = skuRefundRate.Data
    },
  },
  actions: {
    async fetchDailySalesOverview(
      { commit, rootGetters }: { commit: Commit; rootGetters: RootGetters },
      dailySalesOverview: DailySalesOverviewRequest,
    ) {
      const token = rootGetters['getAccessToken']
      if (!token) {
        return
      }
      const response = await salesAnalyticsService.getDailySalesOverview(dailySalesOverview, token)
      if (response.ApiStatusCode === 200) {
        commit('setDailySalesOverview', response)
      }
    },
    async fetchDailySalesSKUList(
      { commit }: { commit: Commit },
      dailySalesSKUList: DailySalesSKUListRequest,
    ) {
      commit('setDailySalesSKUList', dailySalesSKUList)
    },
    fetchSKURefundRate({ commit }: { commit: Commit }, skuRefundRate: SKURefundRateRequest) {
      commit('setSKURefundRate', skuRefundRate)
    },
  },
  getters: {
    getDailySalesOverview(state: SalesAnalyticsState) {
      return state.dailySalesOverview
    },
    getDailySalesSKUList(state: SalesAnalyticsState) {
      return state.dailySalesSKUList
    },
    getSKURefundRate(state: SalesAnalyticsState) {
      return state.skuRefundRate
    },
  },
}
