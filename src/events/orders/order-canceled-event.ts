import { Subjects } from '../base/subjects';

export interface OrderCanceledEvent {
  // we are share limited amount of information, because there is no need for extra information
  subject: Subjects.OrderCanceled;
  data: {
    id: string;
    ticket: {
      id: string;
    };
  };
}
