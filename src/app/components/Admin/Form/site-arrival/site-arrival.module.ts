import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteArrivalComponent } from '../../../Admin/Form/site-arrival/site-arrival.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Site Arrival Forms',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Site Arrival Forms'}]
    },
    component: SiteArrivalComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [SiteArrivalComponent]
})
export class SiteArrivalModule { }
