import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComponentsComponent} from './components.component';
import {AdminAuthGuardService} from '../services/auth/admin-auth-guard.service';
import {EmployeeAuthGuardService} from '../services/auth/employee-auth-guard.service';


const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [

        /** Admin Routes **/
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AdminAuthGuardService]},
        { path: 'employees', loadChildren: './Admin/Employee/all-employee/all-employee.module#AllEmployeeModule'},

        /** Employee Routes **/
        { path: 'employee', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [EmployeeAuthGuardService]},
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
