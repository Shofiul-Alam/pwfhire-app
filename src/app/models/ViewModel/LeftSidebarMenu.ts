import {LeftSidebarMenuItem} from './LeftSidebarMenuItem';
import {LeftSidebarSubMenu} from './LeftSidebarSubMenu';

export class LeftSidebarMenu {
    public static readonly adminMenuEmployee = [
      new LeftSidebarMenuItem('Add Employee', 'fa fa-user-plus', '/add-employee', ['', '', '', '']),
      new LeftSidebarMenuItem('Employees', 'fa fa-users', '/employees', ['', '', '', '']),
      new LeftSidebarMenuItem('Allocations', 'mdi mdi-clipboard-text', '/employee-allocation', ['', '', '', '']),
    ];
    public static readonly adminMenuClientProject = [
        new LeftSidebarMenuItem('Add Client', 'mdi mdi-plus-circle', '/add-client', ['', '', '', '']),
        new LeftSidebarMenuItem('Clients', 'fa fa-address-card', '/clients', ['', '', '', '']),
        new LeftSidebarMenuItem('Add Project', 'mdi mdi-plus-circle', '/add-project', ['', '', '', '']),
        new LeftSidebarMenuItem('Projects', 'fa fa-list-ul', '/projects', ['', '', '', '']),
        new LeftSidebarMenuItem('Add Order', 'mdi mdi-plus-circle', '/add-order', ['', '', '', '']),
        new LeftSidebarMenuItem('Orders', 'fa fa-list-ul', '/orders', ['', '', '', '']),
    ];
    public static readonly adminMenuTimeSheets = [
        new LeftSidebarMenuItem('Add TimeSheet', 'mdi mdi-plus-circle', '/add-timesheet', ['', '', '', '']),
        new LeftSidebarMenuItem('TimeSheets', 'fa fa-list-ul', '/timesheet-collection', ['', '', '', '']),
    ];
    public static readonly adminMenuForms = [
        new LeftSidebarMenuItem('Forms', 'fa fa-list-alt', '/add-form', ['', '', '', '']),
        new LeftSidebarMenuItem('Submitted Forms', 'fa fa-database', '/submitted-forms', ['', '', '', '']),
        new LeftSidebarMenuItem('Arrival Forms', 'mdi mdi-newspaper', '/site-arrival-forms', ['', '', '', '']),
    ];
    public static readonly adminMenuInductions = [
        new LeftSidebarMenuItem('Inductions', 'fa fa-list-ul', '/inductions-list', ['', '', '', '']),
        new LeftSidebarMenuItem('Submitted Data', 'fa fa-database', '/submitted-inductions', ['', '', '', '']),
    ];
    public static readonly adminMenuSettings = [
        new LeftSidebarMenuItem('Positions', 'mdi mdi-account-network', '/positions', ['', '', '', '']),
        new LeftSidebarMenuItem('Qualifications', 'mdi mdi-wallet-membership', '/qualifications', ['', '', '', '']),
    ];
    public static readonly adminMenuIntegration = [
        new LeftSidebarMenuItem('Twilio', 'mdi  mdi-message-text-outline', '/twilio', ['', '', '', '']),
    ];
    public static readonly adminMenu: Array<LeftSidebarSubMenu> = [
        new LeftSidebarSubMenu(null, 'Dashboard', 'mdi mdi-gauge', 'dashbaord', ['nav-toogle router-link-active']),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuEmployee, 'Employee', 'fa fa-sitemap', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuClientProject, 'Client & Project', 'fa fa-briefcase', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuTimeSheets, 'TimeSheets', 'fa fa-table', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuForms, 'Form Section', 'fa fa-wpforms', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuInductions, 'Induction Section', 'fa fa-bookmark', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuSettings, 'Settings', 'fa fa-gear', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuIntegration, 'Integrations', 'mdi mdi-arrow-compress-all', '', []),
    ];

    public static readonly employeeTimeSheet = [
        new LeftSidebarMenuItem('Uploads', 'fa fa-phone', '/uploads', ['', '', '', '']),
    ];

    public static readonly employeeMenu: Array<LeftSidebarSubMenu> = [
        new LeftSidebarSubMenu( null, 'Job/Allocation', 'fa fa-tasks', '', []),
        new LeftSidebarSubMenu( null, 'My Details', 'mdi mdi-account-circle', 'employee', []),
        new LeftSidebarSubMenu( null, 'Forms/Inductions', 'fa fa-wpforms', '', []),
        new LeftSidebarSubMenu( LeftSidebarMenu.employeeTimeSheet, 'Check My Timesheet', 'fa fa-calendar', '', []),
    ];

    public static readonly clientMenu: Array<LeftSidebarSubMenu> = [
        new LeftSidebarSubMenu( null, 'Job/Allocation', '', '', []),
        new LeftSidebarSubMenu( null, 'My Details', '', '', []),
        new LeftSidebarSubMenu( null, 'Forms/Inductions', '', '', []),
        new LeftSidebarSubMenu( null, 'Check My Timesheet', '', '', []),
    ];

    public static LeftMenu: any;


    constructor() {}
    public static getMenu(access_level: string) {
        let menu: any;
        switch (access_level) {
            case 'admin': menu = LeftSidebarMenu.adminMenu; break;
            case 'employee': menu = LeftSidebarMenu.employeeMenu; break;
            case 'client': menu = LeftSidebarMenu.clientMenu; break;
        }
        return menu;
    }
}
