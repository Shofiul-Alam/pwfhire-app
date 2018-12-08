import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from '../../../Admin/Client/client/client.component';
import {RouterModule, Routes} from '@angular/router';



const routes: Routes = [{
    path: '',
    data: {
        title: 'Client Operations',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Client Operations'}]
    },
    component: ClientComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [ClientComponent]
})
export class ClientModule { }
