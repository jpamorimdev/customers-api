import { Controller, Get } from '@nestjs/common'
import { HealthCheckService } from './healthcheck.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('healthcheck')
@Controller('healthcheck')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @ApiOkResponse()
  @Get()
  async index() {
    return await this.healthCheckService.check()
  }
}
