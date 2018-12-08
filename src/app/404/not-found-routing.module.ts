import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './not-found.component';

const routes: Routes = [
  {
    path: '',
    data: {
        title: 'Page Not Found',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Page Not Found'}]
    },
    component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class NotFoundRoutingModule {
}
