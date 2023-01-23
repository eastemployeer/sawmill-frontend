import { OrderDetails } from '@/models/OrderDetails';
import { ClientDetails } from '@/models/ClientDetails';

export interface Order {
    id: number;
    number: number;
    clientDetails: ClientDetails;
    creationDate: Date;
    acceptanceDate?: Date;
    state: number;
    orderDetails: OrderDetails[];
    price: number;
  }
