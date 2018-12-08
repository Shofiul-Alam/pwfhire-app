import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedFormComponent } from '../../../Admin/Form/submitted-form/submitted-form.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Submitted Forms',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Submitted Forms'}]
    },
    component: SubmittedFormComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [SubmittedFormComponent]
})
export class SubmittedFormModule { }
