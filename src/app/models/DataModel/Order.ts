import {Project} from './Project';

export class Order {
    public identifier: any;
    public title: any;
    public orderStart: any;
    public orderEnd: any;
    public description: any;
    public comments: any;
    public status: any;
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public projectIdentifier: any;
    public project: Project = new Project();
    constructor() {}
}
