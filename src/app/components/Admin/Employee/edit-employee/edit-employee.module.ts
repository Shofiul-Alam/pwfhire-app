import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Select2Module} from 'ng2-select2';

import { EditEmployeeComponent } from '../../../Admin/Employee/edit-employee/edit-employee.component';
import {AgmCoreModule} from '@agm/core';



const routes: Routes = [{
    path: '',
    data: {
        title: 'Update Employee Profile',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Update Employee Profile'}]
    },
    component: EditEmployeeComponent
}];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      Select2Module,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCaa9lro2eKyLYyOhPyR_OhKp9cWrFQtE0', libraries: ['places']
      })

  ],
  declarations: [EditEmployeeComponent]
})
export class EditEmployeeModule { }