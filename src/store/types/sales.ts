import type { DailySalesOverviewResponse } from '@/types/api/sales-analytics'
import type { DailySalesSKUListResponse } from '@/types/api/sales-analytics'
import type { SKURefundRateResponse } from '@/types/api/sales-analytics'

export type SalesAnalyticsState = {
  dailySalesOverview: DailySalesOverviewResponse['Data'] | null
  dailySalesSKUList: DailySalesSKUListResponse['Data'] | null
  skuRefundRate: SKURefundRateResponse['Data'] | null
}
