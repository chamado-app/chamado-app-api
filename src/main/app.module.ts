import { Module } from '@nestjs/common'
import { AuthModule } from 'src/presentation/modules/auth.module'

import { UserModule } from '../presentation/modules/user.module'

@Module({
  imports: [UserModule, AuthModule]
})
export class AppModule {}
