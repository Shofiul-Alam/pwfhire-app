import {Order} from './Order';
import {Position} from './Position';

export class Task {
    public identifier: any;
    public name: any;
    public chargeRate: any;
    public payRate: any;
    public totalEmployees: any;
    public taskStartDate: any;
    public taskEndDate: any;
    public taskStartTime: any;
    public taskEndTime: any;
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public orderIdentifier: any;
    public positionIdentifier: any;
    public order: Order = new Order();
    public position: Position = new Position();
    constructor() {}
}
