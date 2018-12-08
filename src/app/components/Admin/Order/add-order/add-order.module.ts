import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from '../../../Admin/Order/add-order/add-order.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'New Order',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'New Order'}]
    },
    component: AddOrderComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AddOrderComponent]
})
export class AddOrderModule { }
