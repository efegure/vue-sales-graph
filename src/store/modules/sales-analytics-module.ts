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
    setDailySalesSKUListNextPage(
      state: SalesAnalyticsState,
      dailySalesSKUList: DailySalesSKUListResponse,
    ) {
      if (!state.dailySalesSKUList) {
        return
      }
      state.dailySalesSKUList.item.skuList = [
        ...state.dailySalesSKUList.item.skuList,
        ...dailySalesSKUList.Data.item.skuList,
      ]
    },
    resetState(state: SalesAnalyticsState) {
      state.dailySalesOverview = null
      state.dailySalesSKUList = null
      state.skuRefundRate = null
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
      { commit, rootGetters }: { commit: Commit; rootGetters: RootGetters },
      dailySalesSKUList: DailySalesSKUListRequest,
    ) {
      const token = rootGetters['getAccessToken']
      if (!token) {
        return
      }
      const response = await salesAnalyticsService.getDailySalesSKUList(dailySalesSKUList, token)
      if (response.ApiStatusCode === 200) {
        if (dailySalesSKUList.pageNumber > 1) {
          commit('setDailySalesSKUListNextPage', response)
        } else {
          commit('setDailySalesSKUList', response)
        }
      }
      return response.Data.item.skuList.length
    },
    async fetchSKURefundRate(
      { commit, rootGetters }: { commit: Commit; rootGetters: RootGetters },
      skuRefundRate: SKURefundRateRequest,
    ) {
      const token = rootGetters['getAccessToken']
      if (!token) {
        return
      }
      const response = await salesAnalyticsService.getSKURefundRate(skuRefundRate, token)
      if (response.ApiStatusCode === 200) {
        commit('setSKURefundRate', response)
      }
    },
    resetSalesData({ commit }: { commit: Commit }) {
      commit('resetState')
    },
  },
  getters: {
    getDailySalesOverview(state: SalesAnalyticsState) {
      return state.dailySalesOverview
    },
    getDailySalesSKUList(state: SalesAnalyticsState) {
      return state.dailySalesSKUList
    },
    getSKUList(state: SalesAnalyticsState) {
      return state.dailySalesSKUList?.item.skuList
    },
    getSKURefundRate(state: SalesAnalyticsState) {
      return state.skuRefundRate
    },
  },
}
