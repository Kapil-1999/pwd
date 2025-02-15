import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path :'dashboard', loadChildren : () => import('./admin-dashboard-manage/admin-dashboard-manage.module').then(m => m.AdminDashboardManageModule)
  },
  {
    path :'master', loadChildren : () => import('./master/master.module').then(m => m.MasterModule)
  },
  {
    path :'live', loadChildren : () => import('./live-tracking/live-tracking.module').then(m => m.LiveTrackingModule)
  },
  {
    path :'history', loadChildren : () => import('./history-tracking/history-tracking.module').then(m => m.HistoryTrackingModule)
  },
  {
    path :'allocation', loadChildren : () => import('./allocation/allocation.module').then(m => m.AllocationModule)
  },
  {
    path :'report', loadChildren : () => import('./report/report.module').then(m => m.ReportModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
