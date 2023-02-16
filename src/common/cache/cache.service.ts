import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject
} from '@nestjs/common'
import { Cache as CacheManager, CachingConfig } from 'cache-manager'
import { canConnect } from './handlers/ioredis'

export class CacheService {
  protected PATH_SEPARATOR = ':'

  constructor(
    protected namespace: string,
    @Inject(CACHE_MANAGER) public cacheManager: CacheManager
  ) {}

  private getNamespacedKeyPath(key?: string) {
    return [this.namespace, key].join(this.PATH_SEPARATOR)
  }

  /**
   * Sets a new key/value in cache manager store
   * @param key the key name
   * @param value the key value
   * @param options the options for the store
   */
  async set(key: string, value: any, options: CachingConfig<any> = {}) {
    await this.canConnectThrow()
    return await this.cacheManager.set(
      this.getNamespacedKeyPath(key),
      value,
      options
    )
  }

  /**
   * Returns a given key stored in cache manager
   * @param key the stored key
   */
  async get(key: string) {
    await this.canConnectThrow()
    return await this.cacheManager.get(this.getNamespacedKeyPath(key))
  }

  /**
   * Delete a specific key in cache manager store
   * @param key the key that will be deleted
   */
  async del(key: string) {
    await this.canConnectThrow()
    return await this.cacheManager.del(this.getNamespacedKeyPath(key))
  }

  async canConnect(): Promise<boolean> {
    if (!this.cacheManager.store) return false
    if ((this.cacheManager as any).store?.name?.toLowerCase() == 'redis')
      return canConnect(this.cacheManager)

    return true
  }

  async canConnectThrow(): Promise<void> {
    if (!(await this.canConnect()))
      throw new HttpException(
        'cache service is unavailable',
        HttpStatus.BAD_GATEWAY
      )
  }
}
