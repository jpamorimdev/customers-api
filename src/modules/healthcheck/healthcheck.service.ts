import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthCheckService {
  async check() {
    return 'OK'
  }
}
