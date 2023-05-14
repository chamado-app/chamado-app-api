import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { config } from '@/infra'

@Module({ imports: [ConfigModule.forRoot({ load: [() => config] })] })
export class EnvironmentConfigModule {}
