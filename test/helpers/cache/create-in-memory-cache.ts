import { caching } from 'cache-manager'

export const createInMemoryCache = async () => {
  return await caching('memory', { ttl: 0 })
}
