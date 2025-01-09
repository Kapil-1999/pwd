import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDistrictReportComponent } from './district-reprot/pages/manage-district-report/manage-district-report.component';
import { ManageGeneralReportComponent } from './general-report/pages/manage-general-report/manage-general-report.component';
import { ManageAttendanceReportComponent } from './attendance-report/pages/manage-attendance-report/manage-attendance-report.component';
import { ManageViewReportComponent } from './view-report/pages/manage-view-report/manage-view-report.component';
import { ManageActivityComponent } from './area-activity/pages/manage-activity/manage-activity.component';

const routes: Routes = [
  {
    path: '', children : [
      {
        path : "district-report", component : ManageDistrictReportComponent
      },
      {
        path : "general-report", component : ManageGeneralReportComponent
      },
      {
        path : "attendance-report", component : ManageAttendanceReportComponent
      },
      {
        path : "view-report", component : ManageViewReportComponent
      },
      {
        path : "area-view", component : ManageActivityComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
