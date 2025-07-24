export type DailySalesOverviewRequest = {
  marketplace: string
  sellerId: string
  requestStatus: number
  day: number
  excludeYoYData: boolean
}

export type DailySalesOverviewResponse = {
  ApiStatus: boolean
  ApiStatusCode: number
  ApiStatusMessage: string
  Data: {
    Currency: string
    item: Array<{
      date: string
      amount: number
      orderCount: number
      unitCount: number
      avgSalesPrev30Days: number
      prevYearDate: string
      prevYearAmount: number
      prevYearOrderCount: number
      prevYearUnitCount: number
      prevYearAvgSalesPrev30Days: number
      profit: number
      yoy30DailySalesGrowth: number
      acos: number
    }>
    isYoyExist: boolean
  }
}
export type DailySalesSKUListRequest = {
  marketplace: string
  sellerId: string
  salesDate: string
  salesDate2: string
  pageSize: number
  pageNumber: number
  isDaysCompare: number
}

export type DailySalesSKUListResponse = {
  ApiStatus: boolean
  ApiStatusCode: number
  ApiStatusMessage: string
  Data: {
    Currency: string
    item: Array<{
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
    }>
  }
}

export type SKURefundRateRequest = {
  marketplace: string
  sellerId: string
  skuList: string[]
  requestedDay: number
}

export type SKURefundRateResponse = {
  ApiStatus: boolean
  ApiStatusCode: string
  ApiStatusMessage: string
  Data: {
    item: Array<{
      sku: string
      refundRate: number
    }>
  }
}
