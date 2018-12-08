import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../../../../Admin/Order/order-operations/task/task.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Tasks List',
        urls: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Order', url: '/orders-list'}, { title: 'Tasks List'}]
    },
    component: TaskComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [TaskComponent]
})
export class TaskModule { }
