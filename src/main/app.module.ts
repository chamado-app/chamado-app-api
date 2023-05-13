import { Module } from '@nestjs/common'

import { UserModule } from '../presentation/modules/user.module'

@Module({
  imports: [UserModule]
})
export class AppModule {}
