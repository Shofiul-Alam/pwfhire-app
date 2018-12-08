import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocateEmployeeComponent } from '../../../Admin/Employee/allocate-employee/allocate-employee.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Employee Allocation',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Employee Allocation'}]
    },
    component: AllocateEmployeeComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AllocateEmployeeComponent]
})
export class AllocateEmployeeModule { }
