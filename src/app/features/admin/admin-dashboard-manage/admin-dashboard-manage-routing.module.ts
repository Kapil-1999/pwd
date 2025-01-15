import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardUserDetailsComponent } from './pages/dashboard-user-details/dashboard-user-details.component';

const routes: Routes = [
  {
    path:'home',component:DashboardPageComponent
  },
  {
    path: 'user-details', component: DashboardUserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardManageRoutingModule { }
