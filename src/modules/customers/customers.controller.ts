import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put
} from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { CustomersException, CustomersStatus } from './customers.exception'
import { AuthenticationGuard } from '../../common/authentication/authentication.guard'
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBearerAuth
} from '@nestjs/swagger'
import { Customer } from './entities/customer.entity'

@ApiBearerAuth()
@ApiBadGatewayResponse()
@ApiUnauthorizedResponse()
@UseGuards(AuthenticationGuard)
@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiCreatedResponse({ type: Customer })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto)
  }

  @ApiOkResponse({ type: Customer })
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customersService.findOne(id)
    if (!customer)
      throw new CustomersException(
        'customer not found',
        CustomersStatus.NOT_FOUND
      )
    return customer
  }

  @ApiOkResponse({ type: Customer })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    const updatedCustomer = await this.customersService.update(
      id,
      updateCustomerDto
    )
    if (updatedCustomer instanceof CustomersException) {
      throw updatedCustomer
    }
    return updatedCustomer
  }
}
