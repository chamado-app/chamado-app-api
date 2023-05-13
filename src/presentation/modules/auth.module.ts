import { Module } from '@nestjs/common'
import { makeAuthProvider } from 'src/main/factories/providers/auth.provider'

import { AuthController } from '../controllers/auth.controller'

import { DatabaseModule } from './global'
import { UserModule } from './user.module'

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: makeAuthProvider()
})
export class AuthModule {}
