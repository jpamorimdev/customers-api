import { Test, TestingModule } from '@nestjs/testing'
import { HealthCheckController } from './healthcheck.controller'
import { HealthCheckService } from './healthcheck.service'

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService]
    }).compile()

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController
    )
  })

  it('controller should be defined', () => {
    expect(healthCheckController).toBeDefined()
  })

  it('should return "OK"', async () => {
    expect(await healthCheckController.index()).toBe('OK')
  })
})
