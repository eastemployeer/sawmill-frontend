import { Address } from '@/models/Address';

export interface ClientDetails {
  clientId: number;
  firstName: string;
  lastName: string;
  address: Address;
  companyName : string;
  NIP : string;
  IsArchived : boolean;
}
