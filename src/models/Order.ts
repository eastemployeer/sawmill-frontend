import { OrderDetails } from '@/models/OrderDetails';
import { ClientDetails } from '@/models/ClientDetails';

export interface Order {
    orderId: number;
    orderNumber: number;
    clientDetails: ClientDetails;
    creationDate: Date;
    acceptanceDate?: Date;
    orderState: string;
    orderDetails: OrderDetails[];
    orderPrice: number;
  }
