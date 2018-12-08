import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditClientComponent } from '../../../Admin/Client/edit-client/edit-client.component';
import {RouterModule, Routes} from '@angular/router';



const routes: Routes = [{
    path: '',
    data: {
        title: 'Update Client Information',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Update Client Information'}]
    },
    component: EditClientComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [EditClientComponent]
})
export class EditClientModule { }
