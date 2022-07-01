export enum OrderStatus {
  // when  the order is created, but the ticket, it is trying to order has not been reserved
  Created = 'created',
  // the ticket, that the order is trying to reserve is already been reserved by other user, or the same user, or when the user has canceled the order, or the order expires before payment
  Canceled = 'canceled',
  // order has successfully reserved the ticket but user hasn't paid yet
  AwaitingPayment = 'awaiting:payment',
  // Order is complete
  Complete = 'complete',
}
