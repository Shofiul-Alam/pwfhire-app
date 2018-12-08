import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from '../../../Admin/Setting/position/position.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Manage Positions',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Manage Positions'}]
    },
    component: PositionComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [PositionComponent]
})
export class PositionModule { }
