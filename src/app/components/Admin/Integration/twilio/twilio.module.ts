import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwilioComponent } from '../../../Admin/Integration/twilio/twilio.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Twilio Integration',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Twilio Integration'}]
    },
    component: TwilioComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [TwilioComponent]
})
export class TwilioModule { }
