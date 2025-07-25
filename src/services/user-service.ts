import type {
  UserLoginInformationRequest,
  UserLoginInformationResponse,
  UserLogoutResponse,
} from '@/types/api/user'

export const userService = {
  async getUserInformation(
    { email }: UserLoginInformationRequest,
    token: string,
  ): Promise<UserLoginInformationResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/user-information`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
    })
    const data = await response.json()
    return data
  },
  async logout(token: string): Promise<UserLogoutResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  },
}
