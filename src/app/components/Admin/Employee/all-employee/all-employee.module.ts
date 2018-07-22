import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { AllEmployeeComponent } from '../../../Admin/Employee/all-employee/all-employee.component';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Select2Module} from 'ng2-select2';



const routes: Routes = [{
    path: '',
    data: {
        title: 'Employees',
        urls: [{title: 'Employees', url: '/dashboard'}, { title: 'Employees'}]
    },
    component: AllEmployeeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
  ],
  declarations: [AllEmployeeComponent]
})
export class AllEmployeeModule { }
