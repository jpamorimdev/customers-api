import { config } from '../config/index'
import { Module, CacheModule as NestCacheModule } from '@nestjs/common'
import * as ioRedisStore from 'cache-manager-ioredis'

@Module({
  imports: [
    NestCacheModule.register({
      store: ioRedisStore,
      host: config.cache.redis.host,
      username: config.cache.redis.username,
      password: config.cache.redis.password,
      port: config.cache.redis.port,
      ttl: config.cache.redis.ttl,
      isGlobal: true
    })
  ],
  exports: [
    NestCacheModule.register({
      store: ioRedisStore,
      host: config.cache.redis.host,
      username: config.cache.redis.username,
      password: config.cache.redis.password,
      port: config.cache.redis.port,
      ttl: config.cache.redis.ttl,
      isGlobal: true
    })
  ]
})
export class CacheModule {}
