import type { UserLoginInformationResponse } from '@/types/api/user'

export type UserState = {
  userLoginInformation: UserLoginInformationResponse | null
}
