import { type Usecase } from '@/domain/base'
import { type LogoutInputDto } from '@/domain/dtos'
import { type TokenRepository } from '@/domain/repositories'

export class LogoutUsecase implements Usecase<void> {
  constructor(private readonly repository: TokenRepository) {}

  async execute(data: LogoutInputDto): Promise<void> {
    await this.repository.delete(
      { user: { id: data.authenticatedUser.id } },
      true
    )
  }
}
