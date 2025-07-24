export type AccessTokenRequest = {
  Email: string
  Password: string
  GrantType: string
  Scope: string
  ClientId: string
  ClientSecret: string
  RedirectUri: string
}

export type AccessTokenResponse = {
  ApiStatus: boolean
  ApiStatusCode: string
  ApiStatusMessage: string
  Data: {
    AccessToken: string
    RefreshToken: string
    TokenType: string
    ExpiresAt: string
  }
}
