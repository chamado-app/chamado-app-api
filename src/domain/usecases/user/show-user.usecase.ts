import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type ShowUserInputDto } from '@/domain/dtos'
import { Role, type UserEntity } from '@/domain/entities'
import { type UserRepository } from '@/domain/repositories'

export class ShowUserUsecase implements Usecase<UserEntity> {
  constructor(private readonly repository: UserRepository) {}

  async execute({ id, roles }: ShowUserInputDto): Promise<UserEntity> {
    const isManager = roles.includes(Role.MANAGER)
    const filter: Partial<UserEntity> = { id }
    if (!isManager) filter.isActive = true

    const user = await this.repository.getOne({
      filter,
      relations: ['roles', 'sectors']
    })

    if (!user) throw new NotFoundException()
    return user
  }
}
