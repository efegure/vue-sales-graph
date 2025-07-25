import type {
  DailySalesOverviewRequest,
  DailySalesOverviewResponse,
  DailySalesSKUListRequest,
  DailySalesSKUListResponse,
  SKURefundRateRequest,
  SKURefundRateResponse,
} from '@/types/api/sales-analytics'

export const salesAnalyticsService = {
  async getDailySalesOverview(
    { marketplace, sellerId, requestStatus, day, excludeYoYData }: DailySalesOverviewRequest,
    token: string,
  ): Promise<DailySalesOverviewResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/data/daily-sales-overview/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        marketplace,
        sellerId,
        requestStatus,
        day,
        excludeYoYData,
      }),
    })
    const data = await response.json()
    return data
  },
  async getDailySalesSKUList(
    {
      marketplace,
      sellerId,
      salesDate,
      salesDate2,
      pageSize,
      pageNumber,
      isDaysCompare,
    }: DailySalesSKUListRequest,
    token: string,
  ): Promise<DailySalesSKUListResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/data/daily-sales-sku-list/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        marketplace,
        sellerId,
        salesDate,
        salesDate2,
        pageSize,
        pageNumber,
        isDaysCompare,
      }),
    })
    const data = await response.json()
    return data
  },
  async getSKURefundRate(
    { marketplace, sellerId, skuList, requestedDay }: SKURefundRateRequest,
    token: string,
  ): Promise<SKURefundRateResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/data/get-sku-refund-rate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        marketplace,
        sellerId,
        skuList,
        requestedDay,
      }),
    })
    const data = await response.json()
    return data
  },
}
