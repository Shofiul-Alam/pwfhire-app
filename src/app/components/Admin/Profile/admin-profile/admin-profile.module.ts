import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileComponent } from '../../../Admin/Profile/admin-profile/admin-profile.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Update Admin Profile',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Update Admin Profile'}]
    },
    component: AdminProfileComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AdminProfileComponent]
})
export class AdminProfileModule { }
