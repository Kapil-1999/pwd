import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardUserDetailsComponent } from './pages/dashboard-user-details/dashboard-user-details.component';
import { JeDetailsComponent } from './components/je-details/je-details.component';

const routes: Routes = [
  {
    path:'home',component:DashboardPageComponent
  },
  {
    path: 'user-details', component: DashboardUserDetailsComponent
  },
  {
    path : 'area_allot_details', component : JeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardManageRoutingModule { }
