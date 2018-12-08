import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedInductionComponent } from '../../../Admin/Induction/submitted-induction/submitted-induction.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Submitted Inductions List',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Submitted Inductions List'}]
    },
    component: SubmittedInductionComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [SubmittedInductionComponent]
})
export class SubmittedInductionModule { }
