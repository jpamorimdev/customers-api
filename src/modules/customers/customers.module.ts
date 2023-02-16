import { Module } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomersController } from './customers.controller'
import { CustomersCacheService } from './customers.cache'
import { CacheModule } from '../../common/cache/cache.module'
import { AuthenticationModule } from '../../common/authentication/authentication.module'
import { CryptoService } from '../../common/utils/services/crypto.service'

@Module({
  imports: [AuthenticationModule, CacheModule],
  controllers: [CustomersController],
  providers: [CustomersService, CryptoService, CustomersCacheService]
})
export class CustomersModule {}
