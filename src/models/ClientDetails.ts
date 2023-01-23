import { Address } from '@/models/Address';

export interface ClientDetails {
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
  companyName : string;
  NIP : string;
  IsArchived : boolean;
}
