export class Pagination {
    public total: number;
    public count: number;
    public per_page: number;
    public current_page = 1;
    public total_pages: number;
    public links: any = {next: '', previous: ''};

    constructor() {}
}