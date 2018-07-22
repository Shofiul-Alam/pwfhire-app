import {Employee} from '../Employee';

export class EmployeeRequest {
    public identifier: any;
    public firstName: any;
    public lastName: any;
    public mobile: any;
    public dob: any;
    public address: any;
    public nationality: any;
    public emargencyContact: any;
    public emargencyPhone: any;
    public bankName: any;
    public accountNo: any;
    public bsbNo: any;
    public tfn: any;
    public abn: any;
    public superProvider: any;
    public superAccountNo: any;
    public isConvictedForCrime: any;
    public convictionDetails: any;
    public isAboriginal: any;
    public isIslander: any;
    public avater: any;
    public avaterUrl: any;
    public avaterType: any;
    public avaterSize: any;
    public avaterUpdatedOn: any;
    public approved: any;
    public userIdentifier: any;
    public positionsIdentifier: any;


    constructor(employee?: Employee) {
        this.identifier = employee.identifier;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.mobile = employee.mobile;
        this.dob = employee.dob;
        this.address = employee.address;
        this.nationality = employee.nationality;
        this.emargencyContact = employee.emargencyContact;
        this.emargencyPhone = employee.emargencyPhone;
        this.bankName = employee.bankName;
        this.accountNo = employee.accountNo;
        this.bsbNo = employee.bsbNo;
        this.tfn = employee.tfn;
        this.abn = employee.abn;
        this.superProvider = employee.superProvider;
        this.superAccountNo = employee.superAccountNo;
        this.isConvictedForCrime = employee.isConvictedForCrime;
        this.convictionDetails = employee.convictionDetails;
        this.isAboriginal = employee.isAboriginal;
        this.isIslander = employee.isIslander;
        this.avater = employee.avater;
        this.avaterUrl = employee.avaterUrl;
        this.avaterType = employee.avaterType;
        this.avaterSize = employee.avaterSize;
        this.avaterUpdatedOn = employee.avaterUpdatedOn;
        this.approved = employee.approved;
        this.userIdentifier = employee.userIdentifier;
        this.positionsIdentifier = employee.positionsIdentifier;

    }
}
