import { Subjects } from '../base/subjects';

export interface PaymentCreatedEvent {
  subjects: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    // this is used to retrieve information from stripe about payment, we currently are not using it
    stripeId: string;
  };
}
