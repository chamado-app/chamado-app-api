import { Module } from '@nestjs/common'

import { DatabaseModule } from './global'

import { makeUsersProvider } from '@/main/factories'

@Module({
  imports: [DatabaseModule],
  providers: makeUsersProvider(),
  exports: makeUsersProvider()
})
export class UserModule {}
