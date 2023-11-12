import {
  type EquipmentEntity,
  type CategoryEntity,
  type UserEntity,
  type TicketMessageEntity
} from '@/domain/entities'

export class CreateTicketInputDto {
  constructor(
    readonly title: string,
    readonly message: TicketMessageEntity['text'],
    readonly categoryId: CategoryEntity['id'],
    readonly reportedBy: UserEntity,
    readonly equipmentId?: EquipmentEntity['id']
  ) {}
}
