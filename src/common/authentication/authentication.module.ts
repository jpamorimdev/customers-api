import { Module } from '@nestjs/common'

import { AuthenticationGuard } from './authentication.guard'
import { AuthenticationService } from './authentication.service'
import { AUTHENTICATION_STRATEGY_TOKEN } from './authentication.strategy'
import { KeycloakAuthenticationStrategy } from './strategy/keycloak.strategy'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [HttpModule, JwtModule.register({})],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    {
      provide: AUTHENTICATION_STRATEGY_TOKEN,
      useClass: KeycloakAuthenticationStrategy
    }
  ],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
