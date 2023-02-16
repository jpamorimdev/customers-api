import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomersModule } from './modules/customers/customers.module'
import { AuthenticationModule } from './common/authentication/authentication.module'
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenticationModule,
    CustomersModule,
    HealthCheckModule
  ]
})
export class AppModule {}
