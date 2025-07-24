export type UserLogoutResponse = {
  ApiStatus: boolean
  ApiStatusCode: string
  ApiStatusMessage: string
  Data: string
}

export type UserLoginInformationRequest = {
  email: string
}

export type UserLoginInformationResponse = {
  ApiStatus: boolean
  ApiStatusCode: string
  ApiStatusMessage: string
  Data: {
    token: string
    user: {
      firstName: string
      lastName: string
      email: string
      countryCode: string
      callingCode: string
      telephoneNumber: string
      isAdmin: string
      store: [
        {
          storeName: string
          storeId: string
          evaStoreId: string
          storeType: number
          region: string
          paidStatus: number
          pricingStatus: number
          paidDate: string
          reimbursementPackageTrialEndDate: string
          linkedDate: string
          marketplaceName: string
          marketplaceCode: string
          enableRepricing: boolean
        },
      ]
    }
    remainingReimbursementCredit: number
    monthlyReimbursementPackageCredit: number
    packageInformation: {
      turnoverPackageInformation: {
        pricingStatus: number
        packageName: string
        monthlyFee: number
        lowerLimit: number
        upperLimit: number
        reimbursementCredit: number
      }
      skuPackageInformation: {
        packageName: string
        skuChargeFee: number
      }
    }
    isLinkAccount: boolean
    linkAccountParameters: {
      developerName: string
      accountNumber: string
    }
  }
}
