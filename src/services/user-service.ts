import type {
  UserLoginInformationRequest,
  UserLoginInformationResponse,
  UserLogoutResponse,
} from '@/types/api/user'

export const userService = {
  async getUserInformation({
    email,
  }: UserLoginInformationRequest): Promise<UserLoginInformationResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/user-information`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
    const data = await response.json()
    return data
  },
  async logout(): Promise<UserLogoutResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
      method: 'POST',
    })
    const data = await response.json()
    return data
  },
}
