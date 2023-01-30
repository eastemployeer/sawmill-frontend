import { Address } from './Address';
import { Client } from './Client';
import { Employee } from './Employee';

export interface Delivery {
    deliveryId: number;
    orderId: number;
    orderCreationDate: Date;
    sendDate?: Date;
    deliverer?: Employee;
    client: Client;
    deliveryAddress: Address;
    state: string;
}
