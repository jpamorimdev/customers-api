import { Injectable } from '@nestjs/common'

import {
  AuthenticationStrategy,
  UserInfoResponse
} from '../authentication.strategy'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class FakeAuthenticationStrategy implements AuthenticationStrategy {
  constructor(private readonly jwtService: JwtService) {}
  /**
   * Blindly trust the JWT, assume it has the User structure and return the decoded payload
   */
  public authenticate(accessToken: string): Promise<UserInfoResponse> {
    return this.jwtService.decode(accessToken) as Promise<UserInfoResponse>
  }
}
