import { Module } from '@nestjs/common'

import { makeAuthModuleMetadata } from '@/presentation/factories'

@Module(makeAuthModuleMetadata())
export class AuthModule {}
