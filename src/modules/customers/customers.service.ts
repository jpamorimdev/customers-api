import { Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { Customer } from './entities/customer.entity'
import { CustomersException, CustomersStatus } from './customers.exception'
import { CustomersCacheService } from './customers.cache'
import { CryptoService } from '../../common/utils/services/crypto.service'

@Injectable()
export class CustomersService {
  constructor(
    private readonly cache: CustomersCacheService,
    private readonly cryptoService: CryptoService
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = {
      id: this.cryptoService.uuid(),
      ...createCustomerDto
    }
    await this.cache.set(customer.id, customer)
    return new Customer(customer)
  }

  async findOne(id: string): Promise<Customer> | null {
    const customer = (await this.cache.get(id)) as Customer
    return customer ? new Customer(customer) : null
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer | CustomersException> {
    const oldIDCheck = await this.findOne(id)
    if (!oldIDCheck)
      return new CustomersException(
        'customer not found',
        CustomersStatus.NOT_FOUND
      )

    if (id !== updateCustomerDto.id) {
      const newIDCheck = await this.findOne(updateCustomerDto.id)
      if (newIDCheck) {
        return new CustomersException('id conflict', CustomersStatus.CONFLICT)
      }
      await this.cache.del(id)
    }

    await this.cache.set(updateCustomerDto.id, {
      ...oldIDCheck,
      ...updateCustomerDto
    })
    return new Customer(updateCustomerDto)
  }
}
