import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ComponentsComponent} from './components.component';
import { HeaderComponent } from './global-components/header/header.component';
import { BreadcumbComponent } from './global-components/breadcumb/breadcumb.component';
import { LeftSidebarComponent } from './global-components/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './global-components/right-sidebar/right-sidebar.component';
import { FooterComponent } from './global-components/footer/footer.component';
import {ComponentsRoutingModule} from './components-routing.module';
import {SIDEBAR_TOGGLE_DIRECTIVES} from './global-components/sidebar.directive';
import {NAV_DROPDOWN_DIRECTIVES} from './global-components/nav-dropdown.directive';
import { JobAllocationComponent } from './Employee/job-allocation/job-allocation.component';
import { AllTimesheetComponent } from './Admin/TimeSheet/all-timesheet/all-timesheet.component';
import { TimesheetOperationsComponent } from './Admin/TimeSheet/timesheet-operations/timesheet-operations.component';


@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
  ],
  declarations: [
      ComponentsComponent,
      HeaderComponent,
      BreadcumbComponent,
      LeftSidebarComponent,
      RightSidebarComponent,
      FooterComponent,
      SIDEBAR_TOGGLE_DIRECTIVES,
      NAV_DROPDOWN_DIRECTIVES,
      JobAllocationComponent,
      AllTimesheetComponent,
      TimesheetOperationsComponent
      ]
})
export class ComponentsModule { }
