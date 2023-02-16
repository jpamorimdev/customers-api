import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'

@Injectable()
export class CryptoService {
  uuid() {
    return crypto.randomUUID()
  }
}
