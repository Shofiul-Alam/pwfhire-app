import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProjectComponent } from '../../../Admin/Project/all-project/all-project.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [{
    path: '',
    data: {
        title: 'Projects List',
        urls: [{title: 'Dashboard', url: '/dashboard'}, { title: 'Projects List'}]
    },
    component: AllProjectComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
  ],
  declarations: [AllProjectComponent]
})
export class AllProjectModule { }
