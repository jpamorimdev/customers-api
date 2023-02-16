import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsDefined } from 'class-validator'

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  document: number

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  name: string
}
