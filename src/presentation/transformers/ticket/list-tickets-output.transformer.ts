import { type ListTicketsUsecaseOutputDto } from '@/domain/dtos'
import {
  ListTicketsItemDto,
  ListTicketsOutputDto
} from '@/presentation/resources'

export class ListTicketsOutputTransformer {
  static mapTo(data: ListTicketsUsecaseOutputDto): ListTicketsOutputDto {
    const { tickets, total } = data
    const transformedTickets = tickets.map<ListTicketsItemDto>((ticket) => {
      const totalMessages = ticket.messages.length
      const sortedMessages = [...ticket.messages].sort(
        (a, b) => a.sentAt.getTime() - b.sentAt.getTime()
      )
      const lastMessage = sortedMessages[totalMessages - 1]
      const reportedBy = `${ticket.reportedBy.firstName} ${ticket.reportedBy.lastName}`
      const assignedTo = ticket.assignedTo
        ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`
        : ''

      return new ListTicketsItemDto(
        ticket.id,
        ticket.title,
        ticket.status,
        ticket.category.name,
        totalMessages,
        lastMessage.text,
        lastMessage.sentAt,
        reportedBy,
        ticket.createdAt,
        ticket.updatedAt,
        assignedTo
      )
    })

    return new ListTicketsOutputDto(transformedTickets, total)
  }
}
