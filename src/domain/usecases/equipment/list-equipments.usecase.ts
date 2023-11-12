import { type GetManyOptions, type Usecase } from '@/domain/base'
import {
  type ListEquipmentsInputDto,
  type ListEquipmentsUsecaseOutputDto
} from '@/domain/dtos'
import { Role, type EquipmentEntity } from '@/domain/entities'
import { type EquipmentRepository } from '@/domain/repositories'

export class ListEquipmentsUsecase
  implements Usecase<ListEquipmentsUsecaseOutputDto>
{
  constructor(private readonly repository: EquipmentRepository) {}

  async execute(
    options: ListEquipmentsInputDto
  ): Promise<ListEquipmentsUsecaseOutputDto> {
    const { take, skip, search, roles } = options
    const isManager = roles.includes(Role.MANAGER)

    const getOptions: GetManyOptions<EquipmentEntity> = {
      take,
      skip,
      filter: {},
      orderBy: { name: 'ASC' }
    }

    if (!isManager) {
      Object.assign(getOptions, { filter: { isActive: true } })
    }

    if (search) {
      getOptions.search = {
        value: search,
        fields: ['id', 'name', 'brand', 'model', 'serial', 'patrimony']
      }
    }

    const { items, total } = await this.repository.getMany(getOptions)
    return { equipments: items, total }
  }
}
