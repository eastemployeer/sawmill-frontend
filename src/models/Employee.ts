export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  login: string;
  password?: string;
  employeeTypeId: number;
  isBlocked: boolean;
}
