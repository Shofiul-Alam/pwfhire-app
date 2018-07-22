import {User} from './User';
import {Position} from './Position';

export class Employee {
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
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public userIdentifier: any;
    public positionsIdentifier: any;
    public approved: any;
    public user: User = new User();
    public positions: Array<Position> = new Array<Position>();

    constructor() {}
}
