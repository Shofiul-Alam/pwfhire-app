import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationComponent } from '../../../Admin/Setting/qualification/qualification.component';
import {AllocationComponent} from '../../Order/order-operations/allocation/allocation.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Qualifications List',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Qualifications List'}]
    },
    component: QualificationComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [QualificationComponent]
})
export class QualificationModule { }
