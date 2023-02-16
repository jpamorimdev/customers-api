import { ApiProperty } from '@nestjs/swagger'

export class Customer {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  document: number

  constructor(init?: Partial<Customer>) {
    Object.assign(this, init)
  }
}
