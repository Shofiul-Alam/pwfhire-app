import {EmployeeAllocation} from './EmployeeAllocation';
import {Employee} from './Employee';

export class AllocatedDate {
    public identifier: any;
    public allocatedOn: any;
    public allocatedDay: any;
    public employeeResponse: any;
    public isCanceld: any;
    public isAccepted: any;
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public employeeIdentifier: any;
    public employeeAllocationIdentifier: any;
    public employeeAllocation: EmployeeAllocation = new EmployeeAllocation();
    public employee: Employee = new Employee();
    constructor() {}
}
