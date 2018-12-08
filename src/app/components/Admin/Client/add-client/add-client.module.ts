import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from '../../../Admin/Client/add-client/add-client.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'New Client',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'New Client'}]
    },
    component: AddClientComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AddClientComponent]
})
export class AddClientModule { }
