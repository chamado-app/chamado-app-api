import { Module } from '@nestjs/common'

import { makeTicketModuleMetadata } from '@/main/factories'

@Module(makeTicketModuleMetadata())
export class TicketModule {}
