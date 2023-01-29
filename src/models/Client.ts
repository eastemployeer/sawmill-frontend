import { Address } from './Address';

export interface Client {
    clientId: number;
    firstName?: string;
    lastName?: string;
    address?: Address;
    companyName: string;
    nip?: string;
    isArchived?: boolean;
}
