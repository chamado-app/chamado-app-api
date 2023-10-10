import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { config } from '@/infra'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.app.jwtSecret,
      signOptions: { expiresIn: '60m', noTimestamp: true }
    })
  ]
})
export class JwtConfigModule {}
