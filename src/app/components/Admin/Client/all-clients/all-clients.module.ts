import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllClientsComponent } from '../../../Admin/Client/all-clients/all-clients.component';
import {RouterModule, Routes} from '@angular/router';



const routes: Routes = [{
    path: '',
    data: {
        title: 'Clients',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Clients'}]
    },
    component: AllClientsComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AllClientsComponent]
})
export class AllClientsModule { }
