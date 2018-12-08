import {Qualification} from '../Qualification';

export class QualificationRequest {
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
    public image: any;
    constructor(qualification: Qualification) {
        this.identifier = qualification.identifier;
        this.issuedBy = qualification.issuedBy;
        this.expireOn = qualification.expireOn;
        this.description = qualification.description;
        this.documentName = qualification.documentName;
        this.documentUrl = qualification.documentUrl;
        this.documentType = qualification.documentType;
        this.documentSize = qualification.documentSize;
        this.createdOn = qualification.createdOn;
        this.updatedOn = qualification.updatedOn;
        this.deletedOn = qualification.deletedOn;
        this.employeeIdentifier = qualification.employeeIdentifier;
        this.skillIdentifier = qualification.skillIdentifier;
        this.image = qualification.image;
    }
}
