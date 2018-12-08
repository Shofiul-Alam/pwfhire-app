import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComponentsComponent} from './components.component';
import {AdminAuthGuardService} from '../services/auth/admin-auth-guard.service';
import {EmployeeAuthGuardService} from '../services/auth/employee-auth-guard.service';


const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [

        // { path: '404', loadChildren: './404/not-found.module#NotFoundModule' },
        // { path: '**', redirectTo: '404' },

        /************************************* Admin Routes *****************************************************/
        /**************************************************-*****************************************************/
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AdminAuthGuardService]},
        { path: 'admin-profile', loadChildren: './Admin/Profile/admin-profile/admin-profile.module#AdminProfileModule',
            canActivate: [AdminAuthGuardService]},
        /** Employee Management Routes **/
        { path: 'employees', loadChildren: './Admin/Employee/all-employee/all-employee.module#AllEmployeeModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'add-employee', loadChildren: './Admin/Employee/add-employee/add-employee.module#AddEmployeeModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'edit-employee', loadChildren: './Admin/Employee/edit-employee/edit-employee.module#EditEmployeeModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'employee-allocation', loadChildren: './Admin/Employee/allocate-employee/allocate-employee.module#AllocateEmployeeModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'add-allocation', loadChildren: './Admin/Employee/add-employee/add-employee.module#AddEmployeeModule',
            canActivate: [AdminAuthGuardService]},

        /** Client Management Routes **/
        { path: 'clients', loadChildren: './Admin/Client/all-clients/all-clients.module#AllClientsModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'edit-client', loadChildren: './Admin/Client/edit-client/edit-client.module#EditClientModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'add-client', loadChildren: './Admin/Client/add-client/add-client.module#AddClientModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'client-operations', loadChildren: './Admin/Client/client/client.module#ClientModule',
            canActivate: [AdminAuthGuardService]},

        /** Project Management Routes **/
        { path: 'projects', loadChildren: './Admin/Project/all-project/all-project.module#AllProjectModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'edit-project', loadChildren: './Admin/Project/edit-project/edit-project.module#EditProjectModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'add-project', loadChildren: './Admin/Project/add-project/add-project.module#AddProjectModule',
            canActivate: [AdminAuthGuardService]},

        /** Order Management Routes **/
        { path: 'orders', loadChildren: './Admin/Order/all-order/all-order.module#AllOrderModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'add-order', loadChildren: './Admin/Order/add-order/add-order.module#AddOrderModule',
            canActivate: [AdminAuthGuardService]},

        /** Order Operations Management Routes **/
        { path: 'allocate-employees', loadChildren: './Admin/Order/order-operations/allocation/allocation.module#AllocationModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'task-operations', loadChildren: './Admin/Order/order-operations/task/task.module#TaskModule',
            canActivate: [AdminAuthGuardService]},

        /**Contact Management Routes **/
        { path: 'contact-list', loadChildren: './Admin/Contact/contact-list/contact-list.module#ContactListModule',
            canActivate: [AdminAuthGuardService]},

        /**Forms Management Routes **/
        { path: 'forms-list', loadChildren: './Admin/Form/form-list/form-list.module#FormListModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'site-arrival-forms', loadChildren: './Admin/Form/site-arrival/site-arrival.module#SiteArrivalModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'submitted-forms', loadChildren: './Admin/Form/submitted-form/submitted-form.module#SubmittedFormModule',
            canActivate: [AdminAuthGuardService]},

        /**Inductions Management Routes **/
        { path: 'inductions-list', loadChildren: './Admin/Induction/induction-list/induction-list.module#InductionListModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'submitted-inductions',
            loadChildren: './Admin/Induction/submitted-induction/submitted-induction.module#SubmittedInductionModule',
            canActivate: [AdminAuthGuardService]},


        /** TimeSheet Management Routes **/
        // { path: 'timesheet-collection', loadChildren: './Admin/TimeSheet/all-timesheet/all-timesheet.module#AllTimeSheetModule',
        //     canActivate: [AdminAuthGuardService]},
        { path: 'add-timesheet',
            loadChildren: './Admin/TimeSheet/timesheet-operations/timesheet-operations.module#TimesheetOperationsModule',
            canActivate: [AdminAuthGuardService]},

        /**Application Settings Management Routes **/
        { path: 'positions', loadChildren: './Admin/Setting/position/position.module#PositionModule',
            canActivate: [AdminAuthGuardService]},
        { path: 'qualifications', loadChildren: './Admin/Setting/qualification/qualification.module#QualificationModule',
            canActivate: [AdminAuthGuardService]},

        /**Application Integraion Management Routes **/
        { path: 'integrate-twilio', loadChildren: './Admin/Integration/twilio/twilio.module#TwilioModule',
            canActivate: [AdminAuthGuardService]},


        /************************************* Employee Routes *****************************************************/
        /**************************************************-********************************************************/
        { path: 'employee', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [EmployeeAuthGuardService]},



        /************************************* Client Routes *****************************************************/
        /**************************************************-********************************************************/

    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
