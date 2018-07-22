import {Field} from './Field';

export class Form {
    public identifier: any;
    public name: any;
    public isInduction: any;
    public inductionName: any;
    public createdOn: any;
    public updatedOn: any;
    public deletedOn: any;
    public fields: Array<Field> = new Array<Field>();
    constructor() {}
}
