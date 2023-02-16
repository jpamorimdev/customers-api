import { UpdateCustomerDto } from './dto/update-customer.dto'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { Test, TestingModule } from '@nestjs/testing'
import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'
import { CustomersCacheService } from './customers.cache'
import { AuthenticationModule } from '../../common/authentication/authentication.module'
import { AUTHENTICATION_STRATEGY_TOKEN } from '../../common/authentication/authentication.strategy'
import { FakeAuthenticationStrategy } from '../../common/authentication/strategy/fake.strategy'
import { CryptoService } from '../../common/utils/services/crypto.service'
import { CACHE_MANAGER, CacheModule } from '@nestjs/common'
import { Customer } from './entities/customer.entity'
import { createInMemoryCache } from '../../../test/helpers/cache/create-in-memory-cache'
import { MemoryCache } from 'cache-manager'

describe('CustomersController', () => {
  let inMemCache: MemoryCache

  let controller: CustomersController

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

    controller = module.get<CustomersController>(CustomersController)
  })

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })

  let customer: Customer

  it('should return a customer', async () => {
    const data: CreateCustomerDto = {
      name: 'John Doe',
      document: 1
    }

    customer = await controller.create(data)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.name).toBe(data.name)
    expect(customer.document).toBe(data.document)
  })

  it('should return a customer by id', async () => {
    const customerById = await controller.findOne(customer.id)

    expect(customerById).toBeInstanceOf(Customer)
    expect(customerById.id).toBe(customer.id)
  })

  it('should update a customer', async () => {
    const data: UpdateCustomerDto = {
      id: customer.id,
      name: 'Jane Doe',
      document: 2
    }

    const updatedCustomer = await controller.update(customer.id, data)

    expect(updatedCustomer).toBeInstanceOf(Customer)
    expect(updatedCustomer.name).toBe(data.name)
    expect(updatedCustomer.document).toBe(data.document)
  })
})
