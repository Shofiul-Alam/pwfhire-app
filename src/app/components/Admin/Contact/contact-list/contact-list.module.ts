import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../../../Admin/Contact/contact-list/contact-list.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Contacts List',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Contacts List'}]
    },
    component: ContactListComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [ContactListComponent]
})
export class ContactListModule { }
