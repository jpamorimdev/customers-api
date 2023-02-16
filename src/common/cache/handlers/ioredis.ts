import { Cache as CacheManager, Store } from 'cache-manager'
import * as IORedis from 'ioredis'

interface RedisStore extends Store {
  getClient(): IORedis.Redis | IORedis.Cluster
  name: 'redis'
  isCacheableValue(value: any): boolean
  del(...args: any[]): Promise<any>
  reset(...args: any[]): Promise<any>
  keys(...args: any[]): Promise<any>
  ttl(...args: any[]): Promise<any>
}

export async function canConnect(cacheManager: CacheManager): Promise<boolean> {
  const store = cacheManager.store as RedisStore
  const client = store.getClient()
  return client?.status === 'ready'
}
