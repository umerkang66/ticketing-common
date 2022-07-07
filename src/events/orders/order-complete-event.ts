import { Subjects } from '../base/subjects';
import { OrderStatus } from './types/order-status';

export interface OrderCompleteEvent {
  subject: Subjects.OrderComplete;
  data: {
    id: string;
    status: OrderStatus.Complete;
    version: number;
  };
}
