import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOrderComponent } from '../../../Admin/Order/all-order/all-order.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Orders List',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Orders List'}]
    },
    component: AllOrderComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AllOrderComponent]
})
export class AllOrderModule { }
