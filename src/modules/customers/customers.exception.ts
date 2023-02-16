import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomersException extends HttpException {}

export const CustomersStatus = HttpStatus
