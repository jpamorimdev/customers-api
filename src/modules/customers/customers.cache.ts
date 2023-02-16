import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache as CacheManager } from 'cache-manager'
import { CacheService } from '../../common/cache/cache.service'

@Injectable()
export class CustomersCacheService extends CacheService {
  constructor(@Inject(CACHE_MANAGER) cacheManager: CacheManager) {
    super('customer', cacheManager)
  }
}
