import {EmployeeAllocation} from './EmployeeAllocation';
import {Order} from './Order';
import {Employee} from './Employee';
import {Client} from './Client';

export class TimeSheet {
    public identifier: any;
    public date: any;
    public day: any;
    public startTime: any;
    public endTime: any;
    public break: any;
    public isWeekend: any;
    public isNight: any;
    public generalHours: any;
    public overtime: any;
    public comment: any;
    public timesheetName: any;
    public timesheetUrl: any;
    public timesheetFileType: any;
    public timesheetFileSize: any;
    public isApproved: any;
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public allocationIdentifier: any;
    public orderIdentifier: any;
    public projectIdentifier: any;
    public clientIdentifier: any;
    public employeeIdentifier: any;
    public allocation: EmployeeAllocation = new EmployeeAllocation();
    public order: Order = new Order();
    public employee: Employee = new Employee();
    public client: Client = new Client();

    constructor() {}
}
