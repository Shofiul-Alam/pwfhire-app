import {LeftSidebarMenuItem} from './LeftSidebarMenuItem';
import {LeftSidebarSubMenu} from './LeftSidebarSubMenu';

export class LeftSidebarMenu {
    public static readonly adminMenuEmployee = [
      new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
      new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
      new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
      new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
      new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
    ];
    public static readonly adminMenuClientProject = [
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
    ];
    public static readonly adminMenuTimeSheets = [
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
    ];
    public static readonly adminMenuSettings = [
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
    ];
    public static readonly adminMenuIntegration = [
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
        new LeftSidebarMenuItem('pending', 'fa fa-phone', '', ['', '', '', '']),
    ];
    public static readonly adminMenu: Array<LeftSidebarSubMenu> = [
        new LeftSidebarSubMenu(null, 'Dashboard', 'mdi mdi-gauge', 'dashbaord', ['nav-toogle router-link-active']),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuEmployee, 'Employee', '', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuClientProject, 'Client & Project', '', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuTimeSheets, 'TimeSheets', '', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuSettings, 'Settings', '', '', []),
        new LeftSidebarSubMenu(LeftSidebarMenu.adminMenuIntegration, 'Integrations', '', '', []),
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
