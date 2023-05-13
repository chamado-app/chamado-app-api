import { Module } from '@nestjs/common'
import { makeDatabaseProviders } from 'src/main/factories/providers/database.provider'

const database = makeDatabaseProviders()

@Module({
  providers: [...database],
  exports: [...database]
})
export class DatabaseModule {}
