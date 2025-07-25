import type { APIResponse } from '.'

export type AccessTokenRequest = {
  Email: string
  Password: string
  GrantType: string
  Scope: string
  ClientId: string
  ClientSecret: string
  RedirectUri: string
}

export type AccessTokenResponse = APIResponse<{
  AccessToken: string
  RefreshToken: string
  TokenType: string
  ExpiresAt: string
}>
