import { TicketStatus } from '@/domain/entities'

const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.NEW]: 'novo',
  [TicketStatus.ANSWERED]: 'respondido',
  [TicketStatus.AWAITING_RESPONSE]: 'aguardando resposta',
  [TicketStatus.CANCELLED]: 'cancelado',
  [TicketStatus.DONE]: 'concluído',
  [TicketStatus.IN_PROGRESS]: 'em andamento'
}

export const getTicketStatusLabel = (status: TicketStatus): string => {
  return TICKET_STATUS_LABELS[status]
}
