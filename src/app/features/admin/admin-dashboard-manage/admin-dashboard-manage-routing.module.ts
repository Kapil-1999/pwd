import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardUserDetailsComponent } from './pages/dashboard-user-details/dashboard-user-details.component';
import { JeDetailsComponent } from './components/je-details/je-details.component';
import { AreaPlotFormComponent } from './components/area-plot-form/area-plot-form.component';

const routes: Routes = [
  {
    path:'home',component:DashboardPageComponent
  },
  {
    path: 'user-details', component: DashboardUserDetailsComponent
  },
  {
    path : ':id/:desiId/area-allot-details', component : JeDetailsComponent
  },
  {
    path : 'area-plot-form' , component : AreaPlotFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardManageRoutingModule { }
