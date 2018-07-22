import {Field} from './Field';
import {Form} from './Form';
import {Employee} from './Employee';

export class EmployeeInductionData {
    public identifier: any;
    public value: any;
    public optionValueIdentifier: any;
    public fieldIdentifier: any;
    public formIdentifier: any;
    public employeeIdentifier: any;
    public field: Field = new Field();
    public form: Form = new Form();
    public employee: Employee = new Employee();
    constructor() {}
}
