import { Module } from '@nestjs/common'

import { makeDatabaseProviders } from '@/main/factories'

const database = makeDatabaseProviders()

@Module({
  providers: [...database],
  exports: [...database]
})
export class DatabaseModule {}
