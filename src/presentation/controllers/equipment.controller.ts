import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common'

import {
  CreateEquipmentUsecase,
  ShowEquipmentUsecase,
  UpdateEquipmentUsecase
} from '@/domain/usecases'
import { AuthenticatedRoles, ManagerRole } from '@/presentation/decorators'
import { type ShowEquipmentDto } from '@/presentation/resources'
import {
  CreateEquipmentTransformer,
  ShowEquipmentInputTransformer,
  ShowEquipmentTransformer,
  UpdateEquipmentTransformer
} from '@/presentation/transformers'
import {
  CreateEquipmentValidated,
  UpdateEquipmentValidated
} from '@/presentation/validation'

@Controller('equipments')
export class EquipmentController {
  constructor(
    private readonly createEquipmentUsecase: CreateEquipmentUsecase,
    private readonly showEquipmentUsecase: ShowEquipmentUsecase,
    private readonly updateEquipmentUsecase: UpdateEquipmentUsecase
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

  @ManagerRole()
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateEquipmentValidated
  ): Promise<ShowEquipmentDto> {
    const payload = UpdateEquipmentTransformer.mapFrom(data)
    const equipment = await this.updateEquipmentUsecase.execute(id, payload)
    return ShowEquipmentTransformer.mapTo(equipment)
  }
}
