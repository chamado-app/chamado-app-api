import { Module } from '@nestjs/common'

import { AuthModule } from '@/presentation/modules'

@Module({ imports: [AuthModule] })
export class AppModule {}
