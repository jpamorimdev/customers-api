import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'

import {
  AuthenticationStrategy,
  UserInfoResponse
} from '../authentication.strategy'
import { HttpService } from '@nestjs/axios'
import { catchError, lastValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { config } from '../../config'

@Injectable()
export class KeycloakAuthenticationStrategy implements AuthenticationStrategy {
  private logger = new Logger(KeycloakAuthenticationStrategy.name)
  private readonly baseURL: string
  private readonly realm: string

  constructor(private readonly httpService: HttpService) {
    this.baseURL = config.auth.keycloak.baseURL
    this.realm = config.auth.keycloak.realm
  }

  /**
   * Call the OpenId Connect UserInfo endpoint on Keycloak: https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
   *
   * If it succeeds, the token is valid and we get the user infos in the response
   * If it fails, the token is invalid or expired
   */
  async authenticate(accessToken: string): Promise<UserInfoResponse> {
    const url = `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/userinfo`

    const response = await lastValueFrom(
      this.httpService
        .get<UserInfoResponse>(url, {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        })
        .pipe(
          catchError((e: AxiosError) => {
            if (e?.response?.status == HttpStatus.UNAUTHORIZED) {
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
            } else {
              const BAD_GATEWAY_MESSAGE = `authentication service is unavailable`
              this.logger.warn(BAD_GATEWAY_MESSAGE)
              this.logger.error(e.message, e.stack)
              throw new HttpException(
                BAD_GATEWAY_MESSAGE,
                HttpStatus.BAD_GATEWAY
              )
            }
          })
        )
    )

    return response.data
  }
}
