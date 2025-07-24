import type { AccessTokenResponse } from '@/types/api/oauth'

export type OauthState = {
  oauthData: AccessTokenResponse['Data'] | null
}
