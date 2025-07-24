import type { OauthState } from './oauth'
import type { UserState } from './user'
import type { SalesAnalyticsState } from './sales'
import type { DailySalesOverviewResponse } from '@/types/api/sales-analytics'

export interface RootState {
  oauthModule: OauthState
  userModule: UserState
  salesAnalyticsModule: SalesAnalyticsState
}

export interface RootGetters {
  getAccessToken: string | null
  getEmail: string
  getDailySalesOverview: DailySalesOverviewResponse['Data'] | null
}
