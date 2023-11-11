import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { CreateEquipmentUsecase } from '@/domain/usecases'
import { ManagerRole } from '@/presentation/decorators'
import { type ShowEquipmentDto } from '@/presentation/resources'
import {
  CreateEquipmentTransformer,
  ShowEquipmentTransformer
} from '@/presentation/transformers'

import { CreateEquipmentValidated } from '../validation'

@Controller('equipments')
export class EquipmentController {
  constructor(
    private readonly createEquipmentUsecase: CreateEquipmentUsecase
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
}
