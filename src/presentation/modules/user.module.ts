import { Module } from '@nestjs/common'
import { makeUsersProvider } from 'src/main/factories/providers/user.provider'

import { AuthController } from '../controllers/auth.controller'

import { DatabaseModule } from './global'

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: makeUsersProvider()
})
export class UserModule {}
