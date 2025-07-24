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
      state.dailySalesOverview = dailySalesOverview
    },
    setDailySalesSKUList(state: SalesAnalyticsState, dailySalesSKUList: DailySalesSKUListResponse) {
      state.dailySalesSKUList = dailySalesSKUList
    },
    setSKURefundRate(state: SalesAnalyticsState, skuRefundRate: SKURefundRateResponse) {
      state.skuRefundRate = skuRefundRate
    },
  },
  actions: {
    fetchDailySalesOverview(
      { commit }: { commit: Commit },
      dailySalesOverview: DailySalesOverviewRequest,
    ) {
      commit('setDailySalesOverview', dailySalesOverview)
    },
    fetchDailySalesSKUList(
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
