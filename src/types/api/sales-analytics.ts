import type { APIResponse } from '.'

export type DailySalesOverviewRequest = {
  marketplace: string
  sellerId: string
  requestStatus: number
  day: number
  excludeYoYData: boolean
}

export type DailySalesOverviewResponse = APIResponse<{
  Currency: string
  // different from swagger ! missing a lot of properties in swagger docs
  item: Array<{
    acos: number
    advertisingCost: number
    amazonExpense: number
    amount: number
    avgAdvertisingCostPrev30Days: number
    avgProfitPrev30Days: number
    avgSalesPrev30Days: number
    cogs: number
    date: string
    fbaAmount: number
    fbaOrderCount: number
    fbaShippingAmount: number
    fbaUnitCount: number
    fbmAmount: number
    fbmOrderCount: number
    fbmShippingAmount: number
    fbmUnitCount: number
    orderCount: number
    otherFee: number
    prevYearAmount: number
    prevYearAvgSalesPrev30Days: number
    prevYearDate: number
    prevYearFbaAmount: number
    prevYearFbaShippingAmount: number
    prevYearFbmAmount: number
    prevYearFbmShippingAmount: number
    prevYearOrderCount: number
    prevYearShippingAmount: number
    prevYearUnitCount: number
    profit: number
    refundTotalAmount: number
    shippingAmount: number
    totalExpense: number
    totalVatAmount: number
    unitCount: number
    yoy30DailySalesGrowth: number
  }>
  isYoyExist: boolean
}>

export type DailySalesSKUListRequest = {
  marketplace: string
  sellerId: string
  salesDate: string
  salesDate2: string
  pageSize: number
  pageNumber: number
  isDaysCompare: number
}

export type DailySalesSKUListResponse = APIResponse<{
  Currency: string
  item: {
    selectedDate: string
    TotalSale: number
    skuList: Array<{
      sku: string
      productName: string
      qty: number
      shippingAmount: number
      amount: number
      refundPercantage: number
      qty2: number
      amount2: number
    }>
    selectedDate2: string
    TotalSale2: number
  }
}>

export type SKURefundRateRequest = {
  marketplace: string
  sellerId: string
  skuList: string[]
  requestedDay: number
}

export type SKURefundRateResponse = APIResponse<
  Array<{
    sku: string
    refundRate: number
  }>
>
