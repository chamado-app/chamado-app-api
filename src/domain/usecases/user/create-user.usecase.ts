import { UnprocessableEntityException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type HashGenerator } from '@/domain/contracts'
import { type CreateUserInputDto } from '@/domain/dtos'
import { type RoleEntity, type UserEntity } from '@/domain/entities'
import { type RoleRepository, type UserRepository } from '@/domain/repositories'
import { type DeepPartial } from '@/domain/types'

export class CreateUserUsecase implements Usecase<UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute(data: CreateUserInputDto): Promise<UserEntity> {
    await this.verifyEmailIsUnique(data.email)
    const roles = await this.roleRepository.getManyByName(data.roles)
    if (!roles.length) throw new UnprocessableEntityException()

    const userEntity = await this.preparePayload(data, roles)
    return await this.userRepository.create(userEntity)
  }

  private async verifyEmailIsUnique(email: string): Promise<void> {
    const user = await this.userRepository.getOne({
      filter: { email },
      withDeleted: true
    })
    if (user) throw new UnprocessableEntityException()
  }

  private async preparePayload(
    data: CreateUserInputDto,
    roles: RoleEntity[]
  ): Promise<Partial<UserEntity>> {
    const hashedPassword = await this.hashGenerator.generate(data.password)
    const userEntity: DeepPartial<UserEntity> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      roles,
      sectors: data.sectors.map((id) => ({ id }))
    }

    return userEntity as Partial<UserEntity>
  }
}
