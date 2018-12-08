import {Employee} from './Employee';
import {Skill} from './Skill';

export class Qualification {
    public identifier: any;
    public issuedBy: any;
    public expireOn: any;
    public description: any;
    public documentName: any;
    public documentUrl: any;
    public documentType: any;
    public documentSize: any;
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public employeeIdentifier: any;
    public skillIdentifier: any;
    public employee: Employee = new Employee();
    public skill: Skill = new Skill();
    public image: any;
    constructor() {}
}
