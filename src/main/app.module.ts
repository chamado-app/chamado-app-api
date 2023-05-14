import { Module } from '@nestjs/common'

import { EnvironmentConfigModule, TypeOrmConfigModule } from '@/infra'
import { AuthModule } from '@/presentation/modules'

@Module({ imports: [EnvironmentConfigModule, TypeOrmConfigModule, AuthModule] })
export class AppModule {}
