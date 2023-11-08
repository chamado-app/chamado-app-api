import { type Usecase } from '@/domain/base'
import { type UserRepository } from '@/domain/repositories'

export class DeleteUserUsecase implements Usecase<void> {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}
