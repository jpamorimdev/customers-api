import { ApiProperty } from '@nestjs/swagger'
import { CreateCustomerDto } from './create-customer.dto'
import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateCustomerDto extends CreateCustomerDto {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  id: string
}
