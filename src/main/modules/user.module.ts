import { Module } from '@nestjs/common'

import { makeUsersModuleMetadata } from '@/main/factories'

@Module(makeUsersModuleMetadata())
export class UserModule {}
