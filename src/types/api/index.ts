export type APIResponse<T> = {
  ApiStatus: boolean
  ApiStatusCode: number
  ApiStatusMessage: string
  Data: T
}
