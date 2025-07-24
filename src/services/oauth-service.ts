import type { AccessTokenRequest } from '@/types/api/oauth'
import type { AccessTokenResponse } from '@/types/api/oauth'

export const oauthService = {
  async fetchAccessToken({
    Email,
    Password,
    GrantType,
    Scope,
    ClientId,
    ClientSecret,
    RedirectUri,
  }: AccessTokenRequest): Promise<AccessTokenResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email,
        Password,
        GrantType,
        Scope,
        ClientId,
        ClientSecret,
        RedirectUri,
      }),
    })
    const data = await response.json()
    return data
  },
}
