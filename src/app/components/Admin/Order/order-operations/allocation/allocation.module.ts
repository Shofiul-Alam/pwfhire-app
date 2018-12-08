import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationComponent } from '../../../../Admin/Order/order-operations/allocation/allocation.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Allocate Employees',
        urls: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Order', url: '/orders-list'}, { title: 'Allocate Employees'}]
    },
    component: AllocationComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AllocationComponent]
})
export class AllocationModule { }
