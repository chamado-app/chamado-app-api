import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req
} from '@nestjs/common'

import {
  CreateTicketUsecase,
  ListTicketsUsecase,
  ShowTicketUsecase
} from '@/domain/usecases'
import { AuthenticatedRoles } from '@/presentation/decorators'
import {
  type ListTicketsOutputDto,
  type ShowTicketDto
} from '@/presentation/resources'
import {
  CreateTicketTransformer,
  ListTicketsInputTransformer,
  ListTicketsOutputTransformer,
  ShowTicketInputTransformer,
  ShowTicketTransformer
} from '@/presentation/transformers'
import { Request } from '@/presentation/types'
import {
  CreateTicketValidated,
  ListTicketsValidated
} from '@/presentation/validation'

@Controller('tickets')
export class TicketController {
  constructor(
    private readonly createTicketUsecase: CreateTicketUsecase,
    private readonly showTicketUsecase: ShowTicketUsecase,
    private readonly listTicketsUsecase: ListTicketsUsecase
  ) {}

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

  @AuthenticatedRoles()
  @Get()
  async list(
    @Query() query: ListTicketsValidated,
    @Req() request: Request
  ): Promise<ListTicketsOutputDto> {
    const payload = ListTicketsInputTransformer.mapFrom(query, request.user)
    const result = await this.listTicketsUsecase.execute(payload)
    return ListTicketsOutputTransformer.mapTo(result)
  }

  @AuthenticatedRoles()
  @Get(':id')
  async show(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request
  ): Promise<ShowTicketDto> {
    const authenticatedUser = request.user
    const payload = ShowTicketInputTransformer.mapFrom(id, authenticatedUser)
    const ticket = await this.showTicketUsecase.execute(payload)
    return ShowTicketTransformer.mapTo(ticket, authenticatedUser)
  }
}
