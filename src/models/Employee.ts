export interface Employee {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  employeeTypeId?: string;
  isBlocked: boolean;
}
