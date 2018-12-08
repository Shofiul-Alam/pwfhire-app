import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from '../../../Admin/Project/add-project/add-project.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'New Project',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'New Project'}]
    },
    component: AddProjectComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AddProjectComponent]
})
export class AddProjectModule { }
