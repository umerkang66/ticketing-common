import { Subjects } from '../base/subjects';

export interface OrderCanceledEvent {
  // we are share limited amount of information, because there is no need for extra information
  subject: Subjects.OrderCanceled;
  data: {
    // orderId is needed for payments
    id: string;
    // version no. automatically created by mongoose, to track the event version numbers in database
    version: number;
    ticket: {
      // order-ticketId is needed for tickets-service so that it unreserve it
      id: string;
    };
  };
}
