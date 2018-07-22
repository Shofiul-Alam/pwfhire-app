
export class Page {
    static readonly DANGER = 'status alert alert-danger';
    static readonly SUCCESS = 'status alert alert-success';
    static readonly WARNING = 'status alert alert-warning';
    constructor(
        public loader: boolean = false,
        public loaded: boolean = false,
        public code: number = 0,
        public message: any = false,
        public cssClass: string = '',
        public title: string = '',
        public modals: any = {},
        public edit = false,
    ) {}
}
