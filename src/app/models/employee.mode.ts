import { EmployeeRoleEnum } from "./role.enum";

export interface IEmployee {
    empId: number;
    empName: string;
    role: EmployeeRoleEnum,
    managerId?: number;
}