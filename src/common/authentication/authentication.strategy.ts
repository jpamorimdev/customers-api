export const AUTHENTICATION_STRATEGY_TOKEN = 'AuthenticationStrategy'

export interface UserInfoResponse {
  sub: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}

export interface AuthenticationStrategy {
  authenticate(accessToken: string): Promise<UserInfoResponse>
}
