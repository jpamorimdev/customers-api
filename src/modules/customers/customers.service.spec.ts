import { Test, TestingModule } from '@nestjs/testing'
import { CustomersService } from './customers.service'
import { CustomersCacheService } from './customers.cache'
import { AuthenticationModule } from '../../common/authentication/authentication.module'
import { AUTHENTICATION_STRATEGY_TOKEN } from '../../common/authentication/authentication.strategy'
import { FakeAuthenticationStrategy } from '../../common/authentication/strategy/fake.strategy'
import { CryptoService } from '../../common/utils/services/crypto.service'
import { MemoryCache } from 'cache-manager'
import { createInMemoryCache } from '../../../test/helpers/cache/create-in-memory-cache'
import { CACHE_MANAGER, CacheModule } from '@nestjs/common'
import { CustomersController } from './customers.controller'
import { Customer } from './entities/customer.entity'
import { CustomersException, CustomersStatus } from './customers.exception'

describe('CustomersService', () => {
  let inMemCache: MemoryCache
  let service: CustomersService
  let cryptoService: CryptoService

  beforeAll(async () => {
    inMemCache = await createInMemoryCache()
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthenticationModule,
        CacheModule.register({
          store: inMemCache.store,
          isGlobal: true
        })
      ],
      controllers: [CustomersController],
      providers: [
        CustomersService,
        CryptoService,
        CustomersCacheService,
        { provide: CACHE_MANAGER, useValue: inMemCache },
        {
          provide: AUTHENTICATION_STRATEGY_TOKEN,
          useValue: FakeAuthenticationStrategy
        }
      ]
    }).compile()

    service = module.get<CustomersService>(CustomersService)
    cryptoService = module.get<CryptoService>(CryptoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should try find a non registered customer', async () => {
    const customer = await service.findOne(cryptoService.uuid())

    expect(customer).toBeNull()
  })

  it('should try to update a non registered customer', async () => {
    const customer = await service.update(cryptoService.uuid(), new Customer())

    expect(customer).toBeInstanceOf(CustomersException)
    expect((customer as CustomersException).getStatus()).toBe(
      CustomersStatus.NOT_FOUND
    )
  })

  it('should try to update a customer and return a id conflict error', async () => {
    const customer1 = await service.create(
      new Customer({
        name: 'John Doe',
        document: 1
      })
    )

    const customer2 = await service.create(
      new Customer({
        name: 'Jane Doe',
        document: 2
      })
    )

    const updateCustomer2 = await service.update(
      customer2.id,
      new Customer({
        id: customer1.id,
        name: 'Charles Doe',
        document: 2
      })
    )

    expect(updateCustomer2).toBeInstanceOf(CustomersException)
    expect((updateCustomer2 as CustomersException).getStatus()).toBe(
      CustomersStatus.CONFLICT
    )
  })
})
