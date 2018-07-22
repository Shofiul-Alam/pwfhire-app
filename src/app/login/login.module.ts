import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Login',
        urls: [{title: 'Login', url: '/login'}, {title: 'Login'}]
    },
    component: LoginComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
