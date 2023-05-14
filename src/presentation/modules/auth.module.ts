import { Module } from '@nestjs/common'

import { DatabaseModule } from './global'
import { UserModule } from './user.module'

import { makeAuthProvider } from '@/main/factories'
import { AuthController } from '@/presentation/controllers'

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: makeAuthProvider()
})
export class AuthModule {}
