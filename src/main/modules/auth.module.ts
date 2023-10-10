import { Module } from '@nestjs/common'

import { makeAuthModuleMetadata } from '@/main/factories'

@Module(makeAuthModuleMetadata())
export class AuthModule {}
