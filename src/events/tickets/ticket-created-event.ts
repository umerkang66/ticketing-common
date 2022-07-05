import { Subjects } from '../base/subjects';

export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    // when ticket is created, orderId is null or undefined, but we have added it for completion state
    orderId?: string;
    // version no. automatically created by mongoose, to track the event version numbers in database
    version: number;
  };
}
