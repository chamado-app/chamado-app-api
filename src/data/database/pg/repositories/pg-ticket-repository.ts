import { InjectRepository } from '@nestjs/typeorm'
import { type FindOptionsWhere, ILike, Repository } from 'typeorm'

import { PgTicketEntity } from '@/data/database/pg/entities'
import { type GetManyOptions, type GetManyResult } from '@/domain/base'
import { type TicketEntity } from '@/domain/entities'
import { type TicketRepository } from '@/domain/repositories'

import { PgRepository } from './pg-repository'

export class PgTicketRepository
  extends PgRepository<TicketEntity>
  implements TicketRepository
{
  constructor(
    @InjectRepository(PgTicketEntity)
    repository: Repository<PgTicketEntity>
  ) {
    super(repository)
  }

  async getMany(
    options: GetManyOptions<TicketEntity> = {}
  ): Promise<GetManyResult<TicketEntity>> {
    const { fields, filter = {}, orderBy, take, skip, search } = options

    const where: FindOptionsWhere<PgTicketEntity> = {}
    Object.assign(where, filter)

    if (search) {
      const iLikeSearch = ILike(`%${search.value}%`)
      where.title = iLikeSearch
    }

    const [items, total] = await this.repository.findAndCount({
      relations: {
        equipment: true,
        category: true,
        reportedBy: true,
        assignedTo: true,
        messages: true
      },
      skip,
      take,
      where,
      order: orderBy,
      select: fields
    })

    return { items, total }
  }
}
