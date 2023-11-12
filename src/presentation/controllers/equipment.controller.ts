import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post
} from '@nestjs/common'

import { CreateEquipmentUsecase, ShowEquipmentUsecase } from '@/domain/usecases'
import { AuthenticatedRoles, ManagerRole } from '@/presentation/decorators'
import { type ShowEquipmentDto } from '@/presentation/resources'
import {
  CreateEquipmentTransformer,
  ShowEquipmentInputTransformer,
  ShowEquipmentTransformer
} from '@/presentation/transformers'
import { CreateEquipmentValidated } from '@/presentation/validation'

@Controller('equipments')
export class EquipmentController {
  constructor(
    private readonly createEquipmentUsecase: CreateEquipmentUsecase,
    private readonly showEquipmentUsecase: ShowEquipmentUsecase
  ) {}

  @ManagerRole()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateEquipmentValidated
  ): Promise<ShowEquipmentDto> {
    const payload = CreateEquipmentTransformer.mapFrom(data)
    const createdEquipment = await this.createEquipmentUsecase.execute(payload)
    return ShowEquipmentTransformer.mapTo(createdEquipment)
  }

  @AuthenticatedRoles()
  @Get(':id')
  async show(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ShowEquipmentDto> {
    const payload = ShowEquipmentInputTransformer.mapFrom(id)
    const equipment = await this.showEquipmentUsecase.execute(payload)
    return ShowEquipmentTransformer.mapTo(equipment)
  }
}
