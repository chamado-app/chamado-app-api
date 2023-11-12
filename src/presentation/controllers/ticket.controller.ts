import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req
} from '@nestjs/common'

import { CreateTicketUsecase } from '@/domain/usecases'
import { AuthenticatedRoles } from '@/presentation/decorators'
import { type ShowTicketDto } from '@/presentation/resources'
import {
  CreateTicketTransformer,
  ShowTicketTransformer
} from '@/presentation/transformers'
import { Request } from '@/presentation/types'
import { CreateTicketValidated } from '@/presentation/validation'

@Controller('tickets')
export class TicketController {
  constructor(private readonly createTicketUsecase: CreateTicketUsecase) {}

  @AuthenticatedRoles()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateTicketValidated,
    @Req() request: Request
  ): Promise<ShowTicketDto> {
    const authenticatedUser = request.user
    const payload = CreateTicketTransformer.mapFrom(data, authenticatedUser)
    const ticket = await this.createTicketUsecase.execute(payload)
    return ShowTicketTransformer.mapTo(ticket, authenticatedUser)
  }
}
