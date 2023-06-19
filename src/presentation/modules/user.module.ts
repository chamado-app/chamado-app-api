import { Module } from '@nestjs/common'

import { makeUsersModuleMetadata } from '@/presentation/factories'

@Module(makeUsersModuleMetadata())
export class UserModule {}
