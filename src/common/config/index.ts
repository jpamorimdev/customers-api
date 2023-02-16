import 'dotenv/config'

export const config = {
  auth: {
    keycloak: {
      baseURL: process.env.AUTH_KEYCLOAK_BASE_URL as string,
      realm: process.env.AUTH_KEYCLOAK_REALM as string
    }
  },
  cache: {
    redis: {
      host: process.env.CACHE_REDIS_HOST as string,
      username: process.env.CACHE_REDIS_USERNAME as string,
      password: process.env.CACHE_REDIS_PASSWORD as string,
      port: process.env.CACHE_REDIS_PORT as string,
      ttl: (+process.env.CACHE_REDIS_TTL ?? 0) as number
    }
  }
}
