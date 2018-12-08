import {EmployeeInduction} from '../EmployeeInduction';

export class EmployeeInductionRequest {
    public identifier: any;
    public description: any;
    public uploadFileName: any;
    public uploadFileType: any;
    public uploadFileUrl: any;
    public uploadFileSize: any;
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public formIdentifier: any;
    public employeeIdentifier: any;
    public image: any;
    constructor(employeeInduction: EmployeeInduction) {
        this.identifier = employeeInduction.identifier;
        this.description = employeeInduction.description;
        this.uploadFileName = employeeInduction.uploadFileName;
        this.uploadFileType = employeeInduction.uploadFileType;
        this.uploadFileUrl = employeeInduction.uploadFileUrl;
        this.uploadFileSize = employeeInduction.uploadFileSize;
        this.createdOn = employeeInduction.createdOn;
        this.updatedOn = employeeInduction.updatedOn;
        this.deletedOn = employeeInduction.deletedOn;
        this.employeeIdentifier = employeeInduction.employeeIdentifier;
        this.formIdentifier = employeeInduction.formIdentifier;
        this.image = employeeInduction.image;
    }
}
