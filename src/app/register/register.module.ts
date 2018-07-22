import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register.component';
import { ClientComponent } from './client/client.component';
import { EmployeeComponent } from './employee/employee.component';
import { RegisterRoutingModule } from './register-routing.module';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Register',
        urls: [{title: 'Register', url: '/register'}, {title: 'Register'}]
    },
    component: RegisterComponent
}];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      RegisterRoutingModule,
      FormsModule,
  ],
  declarations: [RegisterComponent, ClientComponent, EmployeeComponent]
})
export class RegisterModule { }
