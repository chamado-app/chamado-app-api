import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req
} from '@nestjs/common'

import {
  CreateEquipmentUsecase,
  DeleteEquipmentUsecase,
  ListEquipmentsUsecase,
  ShowEquipmentUsecase,
  UpdateEquipmentUsecase
} from '@/domain/usecases'
import { AuthenticatedRoles, ManagerRole } from '@/presentation/decorators'
import {
  type ListEquipmentsOutputDto,
  type ShowEquipmentDto
} from '@/presentation/resources'
import {
  CreateEquipmentTransformer,
  ListEquipmentsInputTransformer,
  ListEquipmentsOutputTransformer,
  ShowEquipmentInputTransformer,
  ShowEquipmentTransformer,
  UpdateEquipmentTransformer
} from '@/presentation/transformers'
import {
  CreateEquipmentValidated,
  ListEquipmentsValidated,
  UpdateEquipmentValidated
} from '@/presentation/validation'

import { Request } from '../types'

@Controller('equipments')
export class EquipmentController {
  constructor(
    private readonly createEquipmentUsecase: CreateEquipmentUsecase,
    private readonly listEquipmentsUsecase: ListEquipmentsUsecase,
    private readonly showEquipmentUsecase: ShowEquipmentUsecase,
    private readonly updateEquipmentUsecase: UpdateEquipmentUsecase,
    private readonly deleteEquipmentUsecase: DeleteEquipmentUsecase
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
  @Get()
  async list(
    @Query() query: ListEquipmentsValidated,
    @Req() request: Request
  ): Promise<ListEquipmentsOutputDto> {
    const roles = request.user.roles
    const payload = ListEquipmentsInputTransformer.mapFrom(query, roles)
    const result = await this.listEquipmentsUsecase.execute(payload)
    return ListEquipmentsOutputTransformer.mapTo(result)
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

  @ManagerRole()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteEquipmentUsecase.execute(id)
  }
}
