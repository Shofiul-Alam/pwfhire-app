import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from '../../../Admin/Employee/add-employee/add-employee.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'New Employee',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'New Employee'}]
    },
    component: AddEmployeeComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AddEmployeeComponent]
})
export class AddEmployeeModule { }
