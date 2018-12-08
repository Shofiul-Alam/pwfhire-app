import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TimesheetOperationsComponent} from './timesheet-operations.component';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Time Sheet Operations',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Time Sheet Operations'}]
    },
    component: TimesheetOperationsComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: []
})
export class TimesheetOperationsModule { }
