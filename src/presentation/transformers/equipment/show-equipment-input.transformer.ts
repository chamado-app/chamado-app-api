import { ShowEquipmentInputDto } from '@/domain/dtos'

export class ShowEquipmentInputTransformer {
  static mapFrom(id: string): ShowEquipmentInputDto {
    return new ShowEquipmentInputDto(id)
  }
}
