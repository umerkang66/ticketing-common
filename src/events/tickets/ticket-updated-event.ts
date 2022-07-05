import { Subjects } from '../base/subjects';

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    // when order is created, orderId is set to ticket, so we can acquire that order using id
    orderId: string;
    // version no. automatically created by mongoose, to track the event version numbers in database
    version: number;
  };
}
