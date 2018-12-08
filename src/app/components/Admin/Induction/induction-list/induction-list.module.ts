import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InductionListComponent } from '../../../Admin/Induction/induction-list/induction-list.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Inductions List',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Inductions List'}]
    },
    component: InductionListComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [InductionListComponent]
})
export class InductionListModule { }
