import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProjectComponent } from '../../../Admin/Project/edit-project/edit-project.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Update Project',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Update Project'}]
    },
    component: EditProjectComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [EditProjectComponent]
})
export class EditProjectModule { }
