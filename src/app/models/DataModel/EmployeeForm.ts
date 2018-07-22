import {Form} from './Form';
import {Employee} from './Employee';

export class EmployeeForm {
    public identifier: any;
    public formIdentifier: any;
    public employeeIdentifier: any;
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public form: Form = new Form();
    public employee: Employee = new Employee();
    constructor() {}
}
