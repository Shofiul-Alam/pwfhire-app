import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormListComponent } from '../../../Admin/Form/form-list/form-list.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Forms List',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Forms List'}]
    },
    component: FormListComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [FormListComponent]
})
export class FormListModule { }
