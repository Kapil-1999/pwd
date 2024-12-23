import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '', loadChildren: () => import('./admin-dashboard-manage/admin-dashboard-manage.module').then((m => m.AdminDashboardManageModule))
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
