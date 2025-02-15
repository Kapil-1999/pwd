import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardManageRoutingModule } from './admin-dashboard-manage-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomeComponent } from './components/home/home.component';
import { TrackingMapComponent } from './components/tracking-map/tracking-map.component';
import { TrackingDetailComponent } from './components/tracking-detail/tracking-detail.component';
import { EmployeeChartComponent } from './components/employee-chart/employee-chart.component';
import { EmployeeCountingComponent } from './components/employee-counting/employee-counting.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardUserDetailsComponent } from './pages/dashboard-user-details/dashboard-user-details.component';
import { ManageUserDetailsComponent } from './components/manage-user-details/manage-user-details.component';
import { JeDetailsComponent } from './components/je-details/je-details.component';
import { AreaAllotDetailsPopupComponent } from './components/area-allot-details-popup/area-allot-details-popup.component';
import { AreaPlotFormComponent } from './components/area-plot-form/area-plot-form.component';
import { TrackingMapGoogleComponent } from './components/tracking-map-google/tracking-map-google.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    HomeComponent,
    TrackingMapComponent,
    TrackingDetailComponent,
    EmployeeChartComponent,
    EmployeeCountingComponent,
    DashboardUserDetailsComponent,
    ManageUserDetailsComponent,
    JeDetailsComponent,
    AreaAllotDetailsPopupComponent,
    AreaPlotFormComponent,
    TrackingMapGoogleComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardManageRoutingModule,
    SharedModule
  ]
})
export class AdminDashboardManageModule { }
