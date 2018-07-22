import {Client} from './Client';

export class Project {
    public id: any;
    public name: any;
    public address: any;
    public created_at: any;
    public updated_at: any;
    public deleted_at: any;
    public client_id: any;
    public client: Client = new Client();
    constructor() {}
}
