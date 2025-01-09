import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ManageDistrictReportComponent } from './district-reprot/pages/manage-district-report/manage-district-report.component';
import { DistrictReportListComponent } from './district-reprot/compont/district-report-list/district-report-list.component';
import { ManageGeneralReportComponent } from './general-report/pages/manage-general-report/manage-general-report.component';
import { GeneralReportListComponent } from './general-report/component/general-report-list/general-report-list.component';
import { ManageAttendanceReportComponent } from './attendance-report/pages/manage-attendance-report/manage-attendance-report.component';
import { AttendanceReportListComponent } from './attendance-report/component/attendance-report-list/attendance-report-list.component';
import { ViewReportListComponent } from './view-report/component/view-report-list/view-report-list.component';
import { ManageViewReportComponent } from './view-report/pages/manage-view-report/manage-view-report.component';
import { ManageActivityComponent } from './area-activity/pages/manage-activity/manage-activity.component';
import { AreaActivityListComponent } from './area-activity/component/area-activity-list/area-activity-list.component';


@NgModule({
  declarations: [
    ManageDistrictReportComponent,
    DistrictReportListComponent,
    ManageGeneralReportComponent,
    GeneralReportListComponent,
    ManageAttendanceReportComponent,
    AttendanceReportListComponent,
    ViewReportListComponent,
    ManageViewReportComponent,
    ManageActivityComponent,
    AreaActivityListComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
