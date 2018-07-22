import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UnauthoriziedComponent} from './unauthorizied.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Unauthorized',
        urls: [{title: 'Unauthorized', url: '/unauthorized'}, {title: 'Unauthorized'}]
    },
    component: UnauthoriziedComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [UnauthoriziedComponent],
})
export class UnauthorizedModule { }
