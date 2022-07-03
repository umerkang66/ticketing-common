import { Subjects } from '../base/subjects';
import { OrderStatus } from './types/order-status';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    // Date will be stringified
    expiresAt: string;
    // version no. automatically created by mongoose, to track the event version numbers in database
    version: number;
    ticket: {
      id: string;
      price: number;
    };
  };
}
