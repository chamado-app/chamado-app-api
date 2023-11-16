import { NotFoundException, UnprocessableEntityException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type HashGenerator } from '@/domain/contracts'
import { type UpdateUserInputDto } from '@/domain/dtos'
import {
  Role,
  type CategoryEntity,
  type RoleEntity,
  type UserEntity
} from '@/domain/entities'
import { type RoleRepository, type UserRepository } from '@/domain/repositories'
import { type DeepPartial } from '@/domain/types'

export class UpdateUserUsecase implements Usecase<UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute(id: string, data: UpdateUserInputDto): Promise<UserEntity> {
    const existentUser = await this.userRepository.getOne({ filter: { id } })
    if (!existentUser) throw new NotFoundException()

    await this.verifyEmailIsUnique(id, data.email)
    let roles: RoleEntity[] = []

    if (data.roles?.length) {
      roles = await this.roleRepository.getManyByName(data.roles)
    }

    const userEntity = await this.preparePayload(data, roles)
    return await this.userRepository.update(id, userEntity)
  }

  private async verifyEmailIsUnique(id: string, email?: string): Promise<void> {
    if (!email) return
    const user = await this.userRepository.getOne({
      filter: { email },
      withDeleted: true
    })

    if (user?.id && user.id !== id) throw new UnprocessableEntityException()
  }

  private async preparePayload(
    data: UpdateUserInputDto,
    roles: RoleEntity[]
  ): Promise<Partial<UserEntity>> {
    const userEntity: DeepPartial<UserEntity> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    }

    if (data.password) {
      const hashedPassword = await this.hashGenerator.generate(data.password)
      userEntity.password = hashedPassword
    }

    if (roles.length) userEntity.roles = roles
    if (data.sectors?.length) userEntity.sectors = this.prepareSectors(data)

    return userEntity as Partial<UserEntity>
  }

  private prepareSectors(
    data: UpdateUserInputDto
  ): Array<Partial<CategoryEntity>> {
    if (!data.sectors?.length) return []
    if (!this.needsSectors(data.roles)) return []
    return data.sectors.map((id) => ({ id }))
  }

  private needsSectors(roles?: Role[]): boolean {
    if (!roles) return false
    const operationalRoles: Role[] = [Role.TECHNICIAN]
    return roles.some((role) => operationalRoles.includes(role))
  }
}
