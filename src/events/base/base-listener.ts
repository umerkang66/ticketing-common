import type { Message, Stan, SubscriptionOptions } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  protected abstract readonly subject: T['subject'];
  protected abstract queueGroupName: string;
  // this will receive event-data, and event-itself (msg), here we can run some business login
  protected abstract onMessage(data: T['data'], msg: Message): void;
  protected ackWait = 5 * 1000;

  constructor(private client: Stan) {}

  private subscriptionOptions(): SubscriptionOptions {
    // DURABLE NAME
    // durableName can be same as queueGroupName
    // when we create a subscription name, nats internally is going to create a record of subscription, and it will see if the events previously has been sent and acknowledged by this service

    // if event fail by listener, we have to reprocess it, it should be added on the listener
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  private parseMessage(msg: Message): T['data'] {
    const data = msg.getData();
    // it can be string or buffer
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }

  public listen(): void {
    // subscribe to ticket:created channel
    // queueGroup is used if there are two copies of same service listening on same subscription, so the event should only go to one single service copy
    // queueGroup name is also used as DurableName, see the comment (explanation above)
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }
}
