import { Module } from '@nestjs/common'
import { makeUsersProvider } from 'src/main/factories/providers/user.provider'

import { DatabaseModule } from './global'

@Module({
  imports: [DatabaseModule],
  providers: makeUsersProvider(),
  exports: makeUsersProvider()
})
export class UserModule {}
