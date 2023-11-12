import {
  type EquipmentEntity,
  type TicketMessageDataEntity,
  type CategoryEntity,
  type UserEntity
} from '@/domain/entities'

export class CreateTicketInputDto {
  constructor(
    readonly title: string,
    readonly message: TicketMessageDataEntity['text'],
    readonly categoryId: CategoryEntity['id'],
    readonly reportedBy: UserEntity,
    readonly equipmentId?: EquipmentEntity['id']
  ) {}
}
